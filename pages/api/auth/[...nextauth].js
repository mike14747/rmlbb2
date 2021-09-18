import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { getUserForSignin } from '../../../lib/api/user';
import bcryptjs from 'bcryptjs';

export default NextAuth({
    providers: [
        Credentials({
            name: 'username/password',
            credentials: {
                username: { label: 'Username', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                const user = await getUserForSignin(credentials.username);

                if (user?.length === 1) {
                    const matches = await bcryptjs.compare(credentials.password, user[0].password);
                    if (matches) return { name: user[0].username };
                    return null;
                } else {
                    return null;
                }
            },
        }),
    ],
    session: {
        jwt: true,
        // how many seconds until an idle session expires and is no longer valid
        maxAge: 30 * 24 * 60 * 60, // 30 * 24 * 60 * 60 is 30 days
    },
    jwt: {
        signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
    },
    pages: {
        signIn: '/auth/signin',
    },
    callbacks: {
        redirect: async (url, baseUrl) => {
            if (url === '/api/auth/signin') {
                return Promise.resolve('/');
            }
        },
    },
});
