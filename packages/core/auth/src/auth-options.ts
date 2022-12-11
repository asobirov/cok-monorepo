import { type NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

import { prisma } from "@cok/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { env } from "./env";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  cookies: {
    sessionToken: {
      name: "cok-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: 'lax',
        secure: env.NODE_ENV !== 'development',
        path: '/',
        domain: env.NODE_ENV === 'development' ? undefined : '.xpr.im',
      }
    }
  }
};
