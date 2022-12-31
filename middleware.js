import { withAuth } from 'next-auth/middleware';

export default withAuth(
    function middleware(req) {
        // console.log('token:', req.nextauth.token);
        // console.log('req.nextUrl.pathname:', req.nextUrl.pathname);
    },
    {
        callbacks: {
            authorized({ token }) {
                // console.log({ token });
                return !!token;
            },
        },
    },
);

export const config = { matcher: ['/protected'] };
