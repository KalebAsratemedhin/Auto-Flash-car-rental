import NextAuth, { NextAuthOptions, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
      

        try {
          const result = await fetch(`${process.env.BACKEND_URL}/auth/signin`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: credentials?.email,
                    password: credentials?.password
                })
            }
          )

          const data = await result.json()

          if (data) {
            return data;
          } else {
            return null;
          }
        } catch (error) {
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        console.log('google user', user)
        try {
          await fetch(`${process.env.BACKEND_URL}/auth/google`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          });
          return true;
        } catch (error) { 
          console.error("Error during Google sign-in:", error);
          return false;
        }
      }
      return true;
    },
    async session({ session, token }) {
      
      session.user = token.user as User;
      return session;
    },
    async jwt({ token, user }) {

      if (user) {
        token.user = user;
      }

      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET!,
  session: {
    maxAge: 2 * 60
  },
  jwt: {
    maxAge: 2 * 60
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };