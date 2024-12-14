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


          if (result.ok && data) {
            return data.data;
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
          const res = await fetch(`${process.env.BACKEND_URL}/auth/google`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          });

          const data = await res.json();

          if(!res.ok){
            return false
          }

          
          if (data) {
            console.log('data', data)

            user.id = data.data.id,
            user.accessToken = data.data.accessToken,
            user.role = data.data.role
            return true;
          } else {
            return false; 
          }
        } catch (error) { 
          console.error("Error during Google sign-in:", error);
          return false;
        }
      }
      return true;
    },
    async session({ session, token }) {
      console.log('token', token)
      const currentTime = Math.floor(Date.now() / 1000);
      console.log('session time comp', session, 'session date', new Date(session.expires).toLocaleTimeString(), currentTime, token.exp)

      if (token?.exp && currentTime > (token.exp as number)) {
        return session; 
      }

      
      session.user = token.user as User;
      return session;
    },
    async jwt({ token, user, account}) {
      console.log('jwt user', user ,'token with exp', account)
      // if (Date.now() > account?.expires_at * 1000) {
      //   return null; // Invalidate the token
      // }
      if (user) {
        token.user = user;
      }

      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET!,
  session: {
    maxAge: 60 * 60
  },
  jwt: {
    maxAge: 60 * 60
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
