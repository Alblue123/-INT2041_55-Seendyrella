import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

import { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    console.log("Middleware is running");

    // Retrieve the token using NextAuth
    const token = await getToken({ req, secret: process.env.SECRET });
    console.log("Token:", token);

    // If no token exists, redirect to the upload page
    if (!token) {
        console.log("No token found, redirecting to /upload");
        return NextResponse.redirect(new URL("/upload", req.url));
    }

    // Allow access if token exists
    console.log("Token found, allowing access");
    return NextResponse.next();
}

export const config = {
    matcher: ["/library"], // Protect the `/library` route
};
