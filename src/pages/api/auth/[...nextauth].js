import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

export const jwt = async ({token, user, trigger, session}) => {
  if (trigger === 'update') {
    return {...token, ...session.user};
  }
  return {...token, ...user};
};

export const session = ({session, token}) => {
  session.user = token;
  return session;
};

export default async function auth(req, res) {
  return await NextAuth(req, res, {
    providers: [
      CredentialsProvider({
        type: 'credentials',
        name: 'credentials',
        id: 'credentials',
        credentials: {},
        async authorize(credentials) {
          try {
            const {data: userData} = await axios.post(
              process.env.NEXT_PUBLIC_NEXTAUTH_URL,
              credentials,
            );
            return userData;
          } catch (error) {
            // Extract the error message from the server response and throw it
            const errorMessage = error?.response?.data?.error?.message  || '';
            throw new Error(errorMessage);
          }
        },
      }),
    ],
    session: {
      strategy: 'jwt',
    },
    callbacks: {
      session,
      jwt,
      async signIn({user, account, profile, email, credentials}) {
        const isAllowedToSignIn = true;
        if (isAllowedToSignIn) {
          return true;
        } else {
          return false;
        }
      },
    },
    jwt: {
      secret: process.env.NEXTAUTH_SECRET,
    },
    pages: {signIn: '/sign-in', error: '/sign-in'},
  });
}
