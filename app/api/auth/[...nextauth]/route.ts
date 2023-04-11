import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { getUserForSignin } from '@/lib/api/user';

const handler = NextAuth({
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {
                username: { label: 'Username', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },

            async authorize(credentials) {
                if (!credentials) return null;

                const { username, password } = credentials;
                const user = await getUserForSignin(username, password);

                return user ? { id: user.id, name: user.username, role: user.role } : null;
            },
        }),
    ],
    session: {
        strategy: 'jwt',
        maxAge: 90 * (24 * 60 * 60), // (24 * 60 * 60) is 1 day
    },
    pages: {
        signIn: '/login',
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }) {
            if (user?.id) token.id = user.id;
            if (user?.name) token.name = user.name;
            if (user?.role) token.role = user.role;
            return token;
        },
        async session({ session, token }) {
            if (token.id && session.user) session.user.id = token.id;
            if (token.role && session.user) session.user.role = token.role;
            return session;
        },
    },
});

export { handler as GET, handler as POST };
