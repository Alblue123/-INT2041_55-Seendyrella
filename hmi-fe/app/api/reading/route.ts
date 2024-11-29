import { NextResponse } from "next/server";
import fs from "fs";
import { join } from "path";
import { tmpdir } from "os";
import mammoth from "mammoth";

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