'use client';

import { FormEvent, ChangeEvent, useRef, useState, useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import FormInput from '@/components/FormInput';
import Button from '@/components/Button';
import Spinner from '@/components/Spinner';
import ForgotLoginInfo from '@/components/Login/ForgotLoginInfo';

type LoginFormProps = {
    redirectUrl: string
}

export default function LoginForm({ redirectUrl }: LoginFormProps) {
    const { status } = useSession();

    const router = useRouter();

    const username = useRef<string>('');
    const password = useRef<string>('');
    const [isLoading, SetIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        SetIsLoading(true);

        // use the built-in signIn function of next-auth to try to sign in a user
        const loginStatus = await signIn('credentials', {
            username: username.current,
            password: password.current,
            redirect: false,
            // callbackUrl: redirectUrl,
        });

        SetIsLoading(false);

        if (!loginStatus) setError('A network error has occurred.');

        // if the user did not successfully log in, set the error that will be displayed
        if (loginStatus && (!loginStatus.ok || loginStatus.status !== 200)) {
            setError('Login Failed... check your credentials and try again.');
        }
    };

    useEffect(() => {
        if (status === 'authenticated') router.push(redirectUrl);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status]);

    if (status === 'loading') return <Spinner size="large" />;

    if (status === 'unauthenticated') {
        return (
            <>
                {isLoading && <Spinner size="large" />}

                {error && <p className="validation-error">{error}</p>}

                <form onSubmit={handleSignIn} className="form">
                    <FormInput
                        id="username"
                        label="Username"
                        name="username"
                        type="text"
                        required={false}
                        handleChange={(e: ChangeEvent<HTMLInputElement>) => username.current = e.target.value}
                    />

                    <FormInput
                        id="password"
                        label="Password"
                        name="password"
                        type="password"
                        required={false}
                        handleChange={(e: ChangeEvent<HTMLInputElement>) => password.current = e.target.value}
                    />

                    <div className="btn-container">
                        <Button type="submit" size="medium" variant="contained">Sign In</Button>
                    </div>
                </form>

                <ForgotLoginInfo />
            </>
        );
    }

    return null;
}
