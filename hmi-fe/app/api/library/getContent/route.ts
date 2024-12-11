import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const document_name = searchParams.get("document_name");

    if (!document_name) {
        return NextResponse.json({ error: "File name is required" }, { status: 400 });
    }

    const file = await db.users_documents.findFirst({
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

    if ( !document_name) {
        return NextResponse.json(
            { error: "document name are required" },
            { status: 400 }
        );
    }

    try {
        // Find the first matching record
        const document = await db.users_documents.findFirst({
            where: {
                document_name,
            },
        });

        if (!document) {
            return NextResponse.json(
                { error: "Document not found" },
                { status: 404 }
            );
        }

        // Delete the found record
        const deletedDocument = await db.users_documents.delete({
            where: {
                id: document.id, // Use the unique identifier of the found record
            },
        });

        console.log("Deleted file:", deletedDocument);
        return NextResponse.json(
            { message: "File deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting file:", error);
        return NextResponse.json(
            { error: "Failed to delete the document. Please try again." },
            { status: 500 }
        );
    }
}