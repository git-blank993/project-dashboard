import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { db } from "./db";
import { users } from "./db/schema";
import { eq } from "drizzle-orm";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const email = credentials.email as string;
        const password = credentials.password as string;

        const userRecord = await db.query.users.findFirst({
          where: eq(users.email, email),
        });

        if (!userRecord) return null;

        const isPasswordValid = await bcrypt.compare(password, userRecord.passwordHash);

        if (!isPasswordValid) return null;

        return {
          id: userRecord.id,
          name: userRecord.name,
          email: userRecord.email,
          role: userRecord.role,
          affiliation: userRecord.affiliation,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.affiliation = user.affiliation;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.affiliation = token.affiliation as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/project-dashboard/login",
  },
  trustHost: true
});
