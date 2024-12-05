import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");

    if (!username) {
        return NextResponse.json({ error: "Username is required" }, { status: 400 });
    }

    try {
        const files = await db.users_documents.findMany({
            where: { username },
            select: { id: true, document_name: true },
        });

        return NextResponse.json({ files });
    } catch (error) {
        console.error("Error retrieving files:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
