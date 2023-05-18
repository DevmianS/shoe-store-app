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
          const {data: userData} = await axios.post(
            process.env.NEXT_PUBLIC_NEXTAUTH_URL,
            credentials,
          );
          return userData;
        },
      }),
    ],
    session: {
      strategy: 'jwt',
    },
    callbacks: {
      session,
      jwt,
    },
    jwt: {
      secret: process.env.NEXTAUTH_SECRET,
    },
    pages: {signIn: '/sign-in'},
  });
}
