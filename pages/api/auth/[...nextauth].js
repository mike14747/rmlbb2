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
                    if (matches) return { _id: user[0]._id, name: user[0].username };
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
        secret: process.env.JWT_SECRET,
    },
    jwt: {
        signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
    },
    callbacks: {
        async jwt({ token, user, account, profile, isNewUser }) {
            if (user?._id) token._id = user._id;
            return token;
        },
        async session({ session, token, user }) {
            if (token?._id) session.user._id = token._id;
            return session;
        },
    },
});
