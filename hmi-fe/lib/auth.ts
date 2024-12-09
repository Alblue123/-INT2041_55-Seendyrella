import { compare } from 'bcrypt'
import { db } from '@/lib/prisma'
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: './auth/login',
    },
    secret: process.env.SECRET,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {label: "Email", type: "email"}, 
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) {
                    console.log("Missing email or password");
                    return null;
                }
            
                const user = await db.users.findUnique({
                    where: { email: credentials.email },
                });

                console.log("Searching for user with email:", credentials.email);
                console.log("Query result:", user);
            
                if (!user) {
                    console.log("User not found");
                    return null;
                }
            
                const isPasswordValid = await compare(credentials.password, user.password);
            
                if (!isPasswordValid) {
                    console.log("Invalid password");
                    return null;
                }
            
                console.log("User authenticated successfully");
                return {
                    id: String(user.id), // Ensure the ID is a string
                    email: user.email,
                    username: user.username,
                };
            }
            
        })
    ]
    
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      username: string;
      name?: string;
    };
  }
}