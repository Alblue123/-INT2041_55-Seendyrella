import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function GET(req: NextRequest) {
    try {
        // Extract token from request
        const token = await getToken({ req, secret: process.env.SECRET });

        if (!token || !token.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Retrieve user by email
        const user = await db.users.findUnique({
            where: { email: token.email },
            select: { username: true }, // Only fetch the username
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Return username
        return NextResponse.json({ username: user.username });
    } catch (error) {
        console.error("Failed to retrieve username:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
