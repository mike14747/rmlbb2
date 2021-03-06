import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

import { connectToDatabase } from '../../../utils/mongodb';
import bcryptjs from 'bcryptjs';

const options = {
    providers: [
        Providers.Credentials({
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
        // Seconds - How long until an idle session expires and is no longer valid.
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    pages: {
        signIn: '/auth/signin',
    },
    callbacks: {
        async jwt(token, user, account, profile, isNewUser) {
            // Add access_token to the token right after signin
            if (account?.accessToken) {
                token.accessToken = account.accessToken;
            }
            token.randomProperty = 'blah';
            return token;
        },
    },
};

export default (req, res) => NextAuth(req, res, options);
