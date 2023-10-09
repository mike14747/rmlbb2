import type { Metadata } from 'next';
import LoginForm from '@/components/Login/LoginForm';
import { Suspense } from 'react';
import Spinner from '@/components/Spinner';

export const metadata: Metadata = {
    title: 'RML Baseball - Login',
};

export default function Login() {
    return (
        <main id="main">
            <article className="mw-90ch">
                <h1 className="page-heading">
                    Login
                </h1>
                <Suspense fallback={<Spinner />}>
                    <LoginForm />
                </Suspense>
            </article>
        </main>
    );
}
