import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

import { prisma } from "@cok/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { env } from "@cok/env";

const cookiesPrefixBase = "cok-auth";
const useSecureCookies = !!env.VERCEL_URL || !!env.NEXTAUTH_URL;
const cookiesPrefix = useSecureCookies ? `'__Secure-${cookiesPrefixBase}` : `${cookiesPrefixBase}`;

export const authOptions: NextAuthOptions = {
  secret: env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    })
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
      name: `${cookiesPrefix}.session-token`,
      options: {
        domain: env.NODE_ENV !== 'development' ? '.xpr.im' : undefined,
        path: '/',
        httpOnly: true,
        secure: env.NODE_ENV !== 'development',
        sameSite: 'lax',
      },
    },
  }
};
