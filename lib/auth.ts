import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
  debug: true, // Enable debug mode for troubleshooting
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    // Fix for callback issue - Handle token creation
    jwt: async ({ token, user, account }) => {
      // Initial sign in
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          id: user.id,
        };
      }
      return token;
    },
    // Handle session data
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = (token.id as string) || (token.sub as string);
      }
      return session;
    },
    // Handle redirect after sign in
    redirect: async ({ url, baseUrl }) => {
      // Always redirect to dashboard after successful sign in
      if (
        url.startsWith("/api/auth/signin") ||
        url.startsWith("/api/auth/callback")
      ) {
        return `${baseUrl}/dashboard`;
      }
      // If it's an internal path, keep it
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }
      // If it's already an absolute URL matching the baseUrl, keep it
      if (url.startsWith(baseUrl)) {
        return url;
      }
      // Default to baseUrl
      return baseUrl;
    },
  },
};
