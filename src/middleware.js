import {withAuth} from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized({req, token}) {
      return !!token;
    },
  },
});

export const config = {
  matcher: ['/profile/:path*', '/bag', '/add-product', '/my-products'],
};
