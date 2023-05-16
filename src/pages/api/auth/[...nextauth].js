import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

const cookies = {
  sessionToken: {
    name: 'next-auth.session-token',
    options: {
      httpOnly: true,
      sameSite: 'none',
      path: '/',
      domain: process.env.NEXT_PUBLIC_DOMAIN,
      secure: true,
    },
  },
  callbackUrl: {
    name: 'next-auth.callback-url',
  },
  crsfToken: {
    name: 'next-auth.csrf-token',
  },
};

export default async function auth(req, res) {
  console.log('reqq', req);
  return await NextAuth(req, res, {
    providers: [
      Providers.Credentials({
        name: 'credentials',
        id: 'credentials',
        credentials: {
          username: {},
          password: {},
        },
        async authorize(credentials, req) {
          console.log('creds', credentials);
        },
      }),
    ],
    session: {
      strategy: 'jwt',
    },
    cookies: cookies,
    callbacks: {},
  });
}

export const jwt = async ({token, user}) => {
  if (user?.email) {
    return {...token, ...user};
  }

  if (token?.accessTokenExpires) {
    if (Date.now() / 1000 < token?.accessTokenExpires)
      return {...token, ...user};
  } else if (token?.refreshToken) return refreshAccessToken(token);
  return {...token, ...user};
};

export const session = ({session, token}) => {
  if (
    Date.now() / 1000 > token?.accessTokenExpires &&
    token?.refreshTokenExpires &&
    Date.now() / 1000 > token?.refreshTokenExpires
  ) {
    return Promise.reject({
      error: new Error(
        'Refresh token has expired. Please log in again to get a new refresh token.',
      ),
    });
  }
  const accessTokenData = JSON.parse(atob.token.split('.').at(1));
  session.user = accessTokenData;
  token.accessTokenExpires = accessTokenData.exp;
  session.token = token?.token;
  return Promise.resolve(session);
};
