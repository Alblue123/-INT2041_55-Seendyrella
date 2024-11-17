import { NextResponse } from 'next/server';
import {hash} from 'bcrypt';
import { neon } from '@neondatabase/serverless';

export async function POST(request: Request) {
    try {
        const {username, email, password } = await request.json();

        //validate
        console.log({ username, email, password });

        const hashedPassword = await hash(password, 10);

        'use server';
        const sql = neon(`${process.env.DATABASE_URL}`)
        await sql('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [username, email, hashedPassword]);

    } catch (e) {
        console.log({ e });
    }

    return NextResponse.json({ message: "success" });
}