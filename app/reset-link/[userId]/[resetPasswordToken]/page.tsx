'use client';

// import type { Metadata } from 'next';
import { useRef, useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import FormInputForNewPassword from '@/components/FormInputForNewPassword';
import Button from '@/components/Button';
import Spinner from '@/components/Spinner';
import { StatusCodeObj } from '@/types/misc-types';

import styles from '@/styles/profile.module.css';

type PageProps = {
    params: {
        userId: string;
        resetPasswordToken: string;
    }
}

// export const metadata: Metadata = {
//     title: 'Biking Log - Reset Password',
// };

const statusCodeErrorMessages: StatusCodeObj = {
    400: 'An error occurred. New password is not in the proper format.',
    401: 'An error occurred. You do not have permission to make this update.',
    406: 'An error occurred. User or reset password token do not exist.',
    412: 'An error occurred. The reset password token has expired.',
    500: 'A server error occurred. Please try your update again.',
};

export default function ResetLink({ params }: PageProps) {
    const { data: session } = useSession();

    const router = useRouter();

    const password = useRef<string>('');
    const repeatPassword = useRef<string>('');

    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSuccessfullyUpdated, setIsSuccessfullyUpdated] = useState<boolean>(false);

    useEffect(() => {
        if (isSuccessfullyUpdated) {
            router.push('/reset-password-success');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccessfullyUpdated]);

    const handleUpdatePasswordSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsLoading(true);

        if (password.current !== repeatPassword.current) {
            setError('Passwords do not match.');
            return;
        }

        const res = await fetch('/api/users/' + params.userId + '/change-password', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({ userId: params.userId, resetPasswordToken: params.resetPasswordToken, password: password.current }),
        }).catch(error => console.error(error.name + ': ' + error.message));

        if (res?.status === 200) {
            password.current = '';
            repeatPassword.current = '';
            setError('');
            setIsSuccessfullyUpdated(true);
        } else {
            setIsLoading(false);
        }

        if (res && res?.status !== 200) setError(statusCodeErrorMessages[res.status] || 'An unknown error occurred');

        if (!res) setError(statusCodeErrorMessages[500]);
    };

    return (
        <main id="main">
            <article className="mw-75ch">
                <h2 className={'page-heading ' + styles.resetPageHeading}>
                    Reset your password
                </h2>

                {session &&
                    <p>
                        You are already logged in, so you cannot reset your password via the reset link. You must do it via your<> </>
                        <Link href="/profile">
                            profile
                        </Link>.
                    </p>
                }

                {isLoading && <Spinner size="large" />}

                {!session && !isSuccessfullyUpdated &&
                    <>
                        <p>
                            <strong>Note:</strong> Your password reset link expires 60 minutes after your request was submitted.
                        </p>

                        <form className={styles.updateGroup} onSubmit={handleUpdatePasswordSubmit}>
                            {error && <p className={styles.error}>{error}</p>}

                            <FormInputForNewPassword password={password} repeatPassword={repeatPassword} />

                            <Button type="submit" size="medium" variant="contained" theme="primary">Apply</Button>
                        </form>
                    </>
                }
            </article>
        </main>
    );
}
