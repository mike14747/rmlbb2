import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { connectToDatabase } from '../../../utils/mongodb';
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
                const { db } = await connectToDatabase().catch(error => console.log(error));

                let user = await db
                    .collection('users')
                    .find({ username: credentials.username })
                    .limit(1)
                    .toArray();

                if (user && user.length === 1) {
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
