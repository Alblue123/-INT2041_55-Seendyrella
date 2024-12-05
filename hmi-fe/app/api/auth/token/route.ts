import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.SECRET });

    if (!token) {
        return NextResponse.json({ error: "Invalid or missing token" }, { status: 401 });
    }

    console.log("Token content:", token);

    return NextResponse.json({ message: "Valid token", user: token });
}
