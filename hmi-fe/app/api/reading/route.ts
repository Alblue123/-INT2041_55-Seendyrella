import { NextResponse } from "next/server";
import fs from "fs";
import { join } from "path";
import { tmpdir } from "os";
import mammoth from "mammoth";
import { db } from "@/lib/prisma"

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

        const buffer = fs.readFileSync(filePath);

        // Convert the DOCX buffer to HTML with custom styles
        const mammothResult = await mammoth.convertToHtml({ 
            buffer 
        });

        const outputDir = join(tmpdir(), "converted");
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir);
        }

        const outputFilePath = join(outputDir, `${fileName}.html`);
        fs.writeFileSync(outputFilePath, mammothResult.value);


        return new Response(mammothResult.value, { 
            status: 200, 
            headers: { "Content-Type": "text/html" } 
        });
    } catch (error) {
        console.error("Error reading file:", error);
        return NextResponse.json({ error: "Failed to process the file" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log("Received payload:", body);

        const { username, document_name, content } = body;

        if (!username || !document_name || !content) {
            console.error("Missing required fields:", { username, document_name, content });
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        await saveDocumentToDatabase(username, document_name, content);

        // Simulate saving to the database
        console.log("Saving document:", { username, document_name, content });

        return NextResponse.json({ message: "Document saved successfully!" });
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}


export async function saveDocumentToDatabase(username: string, bookName: string, content: string) {
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
                    content: content,
                },
            });
            console.log("Document updated:", updatedDocument);
        }
    } catch (error) {
        console.error("Error accessing database:", error);
        throw new Error("Database error");
    }
}