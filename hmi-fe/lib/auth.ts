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
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { }, // You can define the input type for better UX
                password: { },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) {
                    return null
                }
        
                const user = await db.users.findUnique({
                    where: { email: credentials.email }
                })
        
                if (!user) {
                    return null
                }
        
                const isPasswordValid = await compare(credentials.password, user.password)
        
                if (!isPasswordValid) {
                    return null
                }
        
                return {
                    id: String(user.id), // Ensure the id is returned as a string
                    email: user.email,
                    username: user.username
                }
            }
        })
    ]
}

