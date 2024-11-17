import { db } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { hash } from "bcrypt"

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { username, email, password } = body;

        const existedUserEmail = await db.users.findUnique({
            where: {
                email: email
            }
        });
        if (existedUserEmail) {
            return 
            
            NextResponse.json({ message: "Email already exists" }, { status: 409 });
        }

        const existedUserName = await db.users.findUnique({
            where: {
                username: username
            }
        });
        if (existedUserName) {
            return 
            
            NextResponse.json({ message: "Username already exists" }, { status: 409 });
        }

        const hashedPassword = await hash(password, 10);
        const newUser = await db.users.create({
            data: {
                username: username,
                email: email,
                password: hashedPassword
            }
        });

        const { password: newUserPassword, ...rest} = newUser;

        console.log("New user created with hashed password:", newUserPassword); 

        return NextResponse.json({user: rest, message: "success"}, {status: 201});


    } catch(e) {
        console.error(e);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
