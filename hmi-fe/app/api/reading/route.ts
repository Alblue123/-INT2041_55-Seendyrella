import { NextResponse } from "next/server";
import fs from "fs";
import { join, resolve } from "path";
import { tmpdir } from "os";
import mammoth from "mammoth";
import { db } from "@/lib/prisma";
import ConvertAPI from 'convertapi';

const convertapi = new ConvertAPI('secret_PxZOYi6kRjziuOot');

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const fileName = searchParams.get("fileName");

    if (!fileName) {
      return NextResponse.json({ error: "File name is required" }, { status: 400 });
    }

    try {
      const saveDir = join(tmpdir(), "uploads");
      const filePath = join(saveDir, fileName);

      if (!fs.existsSync(filePath)) {
        return NextResponse.json({ error: "File not found" }, { status: 404 });
      }

      const outputDir = join(tmpdir(), "converted");

      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
      }

      let htmlContent: string;

      if (fileName.toLowerCase().endsWith('.docx')) {
        // Process DOCX with Mammoth
        const fileBuffer = fs.readFileSync(filePath);
        const mammothResult = await mammoth.convertToHtml({ buffer: fileBuffer });
        htmlContent = mammothResult.value;

        // Save the HTML output for reference
        const outputFilePath = join(outputDir, `${fileName}.html`);
        fs.writeFileSync(outputFilePath, htmlContent);
      } else if (fileName.toLowerCase().endsWith('.pdf')) {
        // Convert PDF to DOCX using ConvertAPI
        const pdfFilePath = resolve(filePath);
        const convertedFileName = fileName.replace('.pdf', '.docx');
        const convertedFilePath = join(outputDir, convertedFileName);

        // Perform the PDF to DOCX conversion
        const result = await convertapi.convert('docx', { File: pdfFilePath }, 'pdf');
        await result.saveFiles(outputDir);

        // Process the converted DOCX with Mammoth
        const fileBuffer = fs.readFileSync(convertedFilePath);
        const mammothResult = await mammoth.convertToHtml({ buffer: fileBuffer });
        htmlContent = mammothResult.value;

        // Save the HTML output for reference
        const outputFilePath = join(outputDir, `${fileName}.html`);
        fs.writeFileSync(outputFilePath, htmlContent);
      } else {
        return NextResponse.json({ error: "Unsupported file type" }, { status: 415 });
      }

      // Return the extracted HTML content
      return new Response(htmlContent, {
        status: 200,
        headers: {
          "Content-Type": "text/html",
        },
      });
    } catch (error) {
      console.error("Unexpected error processing file:", error);
      return NextResponse.json({ 
        error: "Unexpected error occurred", 
      }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log("Received payload:", body);  

        const { username, document_name, content, settings } = body;

        if (!username || !document_name || !content || !settings) {
            console.error("Missing required fields:", { username, document_name, content, settings });
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        await saveDocumentToDatabase(username, document_name, content, settings);

        console.log("Saving document:", { username, document_name, content, settings});

        return NextResponse.json({ message: "Document saved successfully!" });
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}



export async function saveDocumentToDatabase(username: string, bookName: string, content: string, settings: any) {
    try {
        const existingDocument = await db.users_documents.findUnique({
            where: {
                username_document_name: {
                    username: username,
                    document_name: bookName
                },
            },
        });

        if (!existingDocument) {
            const newDocument = await db.users_documents.create({
                data: {
                    username: username,
                    document_name: bookName,
                    content: content,
                    settings: settings,
                },
            });
            console.log("New document created:", newDocument);
        } else {
            const updatedDocument = await db.users_documents.update({
                where: {
                    username_document_name: {
                        username: username,
                        document_name: bookName,
                    },
                },
                data: {
                    settings: settings,
                },
            });
            console.log("Document updated:", updatedDocument);
        }
    } catch (error) {
        console.error("Error accessing database:", error);
        throw new Error("Database error");
    }
}