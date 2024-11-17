import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcrypt';

const handler = NextAuth({
    session: {
      strategy: 'jwt',
    },

    pages: {
        signIn: '/auth/login'
    },

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
            async authorize(credentials, req) {
              const sql = neon(`${process.env.DATABASE_URL}`);
              const response = await sql`
              SELECT * FROM users WHERE email=${credentials?.email}`;
              const user = response[0];

              const passwordCorrect = await bcrypt.compare(
                credentials?.password || '',
                user.password
              );

              console.log({ passwordCorrect });

              if (passwordCorrect) {
                return {
                  id: user.id,
                  email: user.email,
                };
              }
              
              console.log({ credentials });
              return null;
            }
          })
    ]
})

export { handler as GET, handler as POST };