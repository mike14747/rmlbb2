import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import LoginForm from '@/components/Login/LoginForm';

export const metadata: Metadata = {
    title: 'RML Baseball - Login',
};

type LoginProps = {
    searchParams: {
        callbackUrl?: string
    }
}

export default async function Login({ searchParams }: LoginProps) {
    const session = await getServerSession({
        callbacks: { session: ({ token }) => token },
    });

    // get the redirect query parameter if there is one... if not, set the homepage as the redirect location
    let redirectUrl = searchParams.callbackUrl || '/';

    // set an array of query parameters that are not allowed to be redirected to
    const notRedirectable = ['/reset-link', '/reset-password-success', '/login'];

    // check to see whether the query parameter is on the not allowed list
    const notRedirectableCheck = notRedirectable.filter(url => redirectUrl.includes(url));

    // if a resistricted query parameter is included, redirect to the homepage
    if (notRedirectableCheck.length > 0) redirectUrl = '/';

    if (session) {
        redirect(redirectUrl);
    }

    return (
        <main id="main">
            <article className="mw-90ch">
                <h2 className="page-heading">
                    Login
                </h2>

                <LoginForm redirectUrl={redirectUrl} />
            </article>
        </main>
    );
}
