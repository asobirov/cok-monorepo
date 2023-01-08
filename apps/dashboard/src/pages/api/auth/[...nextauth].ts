import NextAuth, { User, type NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@cok/db";
import { env } from "../../../env/server.mjs";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
    async signIn({ user }) {
      if ((user as User).id) {
        const findUser = await prisma.user.findUnique({
          where: {
            id: (user as User).id,
          },
          select: {
            role: true,
          }
        })

        return findUser?.role === 'ADMIN'
      }
      return false;
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
  ],
  secret: env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  }
};

export default NextAuth(authOptions);
