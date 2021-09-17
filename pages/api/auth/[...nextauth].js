import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

import { connectToDatabase } from '../../../utils/mongodb';
import bcryptjs from 'bcryptjs';

export default NextAuth({
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
                    // console.log('user[0]:', user[0]);
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
        signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
        // how many seconds until an idle session expires and is no longer valid
        maxAge: 30 * 24 * 60 * 60, // 30 * 24 * 60 * 60 is 30 days
    },
    pages: {
        signIn: '/auth/signin',
    },
    callbacks: {
        // async jwt(token, user, account, profile, isNewUser) {
        //     // Add access_token to the token right after signin
        //     if (account?.accessToken) {
        //         token.accessToken = account.accessToken;
        //     }
        //     return token;
        // },

        // redirect: async (url, baseUrl) => {
        //     return Promise.resolve('http://localhost:3000/');
        // },

        // redirect: async (url, baseUrl) => {
        //     return url.startsWith(baseUrl)
        //         ? Promise.resolve(url)
        //         : Promise.resolve(baseUrl);
        // },

        // async signIn(user, account, profile) { return true },
        // async redirect(url, baseUrl) { return baseUrl },
        // async session(session, user) { return session },
        // async jwt(token, user, account, profile, isNewUser) { return token }
    },
});
