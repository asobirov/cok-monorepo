import { type NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

import { prisma } from "@cok/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { env } from "@cok/env";

const cookiePrefixBase = "cok-auth";
const cookiePrefix = env.NODE_ENV === "production" ? `'__Secure-${cookiePrefixBase}` : `${cookiePrefixBase}`;

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  secret: env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    })
    // ...add more providers here
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
      name: `${cookiePrefix}.session-token`,
      options: {
        domain: env.NODE_ENV !== 'development' ? '.xpr.im' : undefined,
        path: '/',
        httpOnly: true,
        secure: env.NODE_ENV !== 'development',
        sameSite: 'lax',
      },
    },
    csrfToken: {
      name: `${cookiePrefix}.csrf-token`,
      options: {
        domain: env.NODE_ENV !== 'development' ? '.xpr.im' : undefined,
        path: '/',
        httpOnly: true,
        secure: env.NODE_ENV !== 'development',
        sameSite: 'lax',
      }
    }
  }
};
