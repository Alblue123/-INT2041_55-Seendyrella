import { compare } from 'bcrypt'
import { db } from '@/lib/prisma'
import NextAuth, { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'

export const authOptions: NextAuthOptions = ({
    adapter: PrismaAdapter(db),
    session: {
      strategy: 'jwt',
    },
    //pages: {
      //signIn: '/auth/login'
    //},

    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
              username: {},
              email: {},
              password: {}
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) {
                  return null
                }
        
                const user = await db.users.findUnique({
                  where: {
                    email: credentials?.email
                  }
                })
        
                if (!user) {
                  return null
                }
        
                const isPasswordValid = await compare(
                  credentials.password,
                  user.password
                )
        
                if (!isPasswordValid) {
                  return null
                }
        
                return {
                  id: user.id + '',
                  email: user.email,
                  username: user.username
                }
              }
          })
    ]
})

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }