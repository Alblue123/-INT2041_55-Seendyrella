import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const document_name = searchParams.get("document_name");

    if (!document_name) {
        return NextResponse.json({ error: "File name is required" }, { status: 400 });
    }

    const file = await db.users_documents.findUnique({
        where: { document_name },
        select: { content: true, settings: true },
    });
    if (!file) {
        return NextResponse.json({ error: "File not found" }, { status: 404 });
    }
    console.log("Retrieved file:", file); 

    return NextResponse.json({ content: file.content, settings: file.settings }, { status: 200 });
}

export async function DELETE(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const document_name = searchParams.get("document_name");

    if (!document_name) {
        return NextResponse.json({ error: "File name is required" }, { status: 400 });
    }

    const file = await db.users_documents.delete({
        where: { document_name },
    });
    console.log("Deleted file:", file);

    return NextResponse.json({ message: "File deleted successfully" }, { status: 200 });
}
