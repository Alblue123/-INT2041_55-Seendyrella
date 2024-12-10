import { compare } from 'bcrypt'
import { db } from '@/lib/prisma'
import { DefaultSession, NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    username: string;
  }

  interface Session {
    user: User;
    expires: string;
    error: string;
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "./auth/login",
  },
  secret: process.env.SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
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

        const isPasswordValid = await compare(
          credentials.password,
          user.password
        );

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
      },
    }),
  ],
  // In your auth.ts or [...nextauth].ts
  callbacks: {
    async session({ session, token }: { session: any, token: any }) {
      session.user.username = (token.username as string) || ((token.email as string)?.split("@")[0] ?? "user");
      session.user.email = token.email ?? "";
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username || user.email.split("@")[0];
        token.email = user.email;
      }
      return token;
    },
  },
};

