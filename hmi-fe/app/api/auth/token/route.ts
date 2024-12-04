// pages/api/token.ts
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.SECRET });

    if (!token) {
        return NextResponse.json({ error: "Invalid or missing token" }, { status: 401 });
    }

    return NextResponse.json({ message: "Valid token" }, { status: 200 });
}
