import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { tmpdir } from "os";

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const file = data.get("file") as unknown as File;

  if (!file) {
    return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Define the save directory
  const saveDir = join(tmpdir(), "uploads");
  const filePath = join(saveDir, file.name);

  try {
    // Check if the directory exists, and create it if it doesn't
    await mkdir(saveDir, { recursive: true });

    // Save the file to the directory
    await writeFile(filePath, buffer);

    console.log("File saved to", filePath);
  
    return NextResponse.json(
      { message: "File uploaded successfully", fileName: file.name },
      { status: 201 }
    );
  } catch (error) {
    console.error("File saving error:", error);
    return NextResponse.json(
      { message: "Failed to save the file" },
      { status: 500 }
    );
  }
}
