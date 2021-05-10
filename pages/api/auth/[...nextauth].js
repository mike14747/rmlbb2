import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

import { connectToDatabase } from '../../../utils/mongodb';
import bcryptjs from 'bcryptjs';

const options = {
    providers: [
        Providers.Credentials({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'username/password',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                username: { label: 'Username', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                // Add logic here to look up the user from the credentials supplied
                const { db } = await connectToDatabase();

                let user = await db
                    .collection('users')
                    .find({ username: credentials.username })
                    .limit(1)
                    .toArray();

                if (user && user.length === 1) {
                    // Any object returned will be saved in `user` property of the JWT
                    const matches = await bcryptjs.compare(credentials.password, user[0].password);
                    if (matches) return { name: user[0].username };
                    return null;
                } else {
                    // If you return null or false then the credentials will be rejected
                    return null;
                    // You can also Reject this callback with an Error or with a URL:
                    // throw new Error('error message') // Redirect to error page
                    // throw '/path/to/redirect'        // Redirect to a URL
                }
            },
        }),
    ],
    session: {
        jwt: true,
        // Seconds - How long until an idle session expires and is no longer valid.
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    // pages: {
    //     signIn: '/auth/signin',
    // },
};

export default (req, res) => NextAuth(req, res, options);
