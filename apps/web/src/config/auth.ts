import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import type { NextAuthOptions } from 'next-auth';
import type { AuthErrorMessages } from '@/types/auth';
import prisma from '../../../api/prisma/client';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.given_name,
          email: profile.email,
          image: profile.picture,
          role: {
            connect: {
              name: 'customer',
            },
          },
        };
      },
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    signIn: '/sign-in',
  },
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'database',
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      // get user by id
      // create jwt payload
      // create jwt token
      // save token in local storage
      if (user) token.id = user.id;
      return token;
    },
    session: async ({ session, token }) => {
      if (!session?.user) return session;
      return session;
    },
  },
};

export const authErrorMessages = {
  Signin: 'Try signing in with a different account.',
  OAuthSignin: 'Try signing in with a different account.',
  OAuthCallback: 'Try signing in with a different account.',
  OAuthCreateAccount: 'Try signing in with a different account.',
  EmailCreateAccount: 'Try signing in with a different account.',
  Callback: 'Try signing in with a different account.',
  OAuthAccountNotLinked:
    'To confirm your identity, sign in with the same account you used originally.',
  EmailSignin: 'Check your email inbox.',
  CredentialsSignin:
    'Sign in failed. Check the details you provided are correct.',
  SessionRequired: 'Please sign in to access this page.',
  default: 'Unable to sign in.',
} as AuthErrorMessages;
