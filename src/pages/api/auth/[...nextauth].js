import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

const cookies = {
  sessionToken: {
    name: 'next-auth.session-token',
    options: {
      httpOnly: true,
      sameSite: 'none',
      path: '/',
      secure: true,
    },
  },
};

export const jwt = async ({token, user}) => {
  return {...token, ...user};
};

export const session = ({session, token}) => {
  session.user = token;
  return session;
};

const signIn = ({user, account, profile, email, credentials}) => {
  console.log(user);
  const isAllowedToSignIn = true;
  if (isAllowedToSignIn) {
    return '/';
  } else {
    return '/sign-in';
  }
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
    cookies: cookies,
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
