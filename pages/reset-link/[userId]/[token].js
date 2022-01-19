import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import PasswordResetForm from '../../../components/PasswordResetForm';

import styles from '../../../styles/profile.module.css';

export default function Token() {
    const { data: session } = useSession();

    const router = useRouter();

    const [passwordError, setPasswordError] = useState(null);
    const [newPassword, setNewPassword] = useState('');
    const [repeatPassword, setrepeatPassword] = useState('');

    const handleUpdatePasswordSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch('/api/auth/update-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({ userId: router.query.userId, token: router.query.token, newPassword }),
        });

        if (res.status !== 200) {
            res.status === 400 && setPasswordError('An error occurred. New password is not in the proper format.');
            res.status === 401 && setPasswordError('An error occurred. You do not have permission to make this update.');
            res.status === 500 && setPasswordError('A server error occurred. Please try your update again.');
        }
        if (res.status === 200) {
            setNewPassword('');
            setrepeatPassword('');
            setPasswordError(null);
        }
    };

    return (
        <>
            <Head>
                <title>
                    RML Baseball - Reset your password
                </title>
            </Head>

            <article className={styles.profileContainer}>
                <h2 className="page-heading">
                    Reset your password
                </h2>

                {session &&
                    <p>
                        You are already logged in, so you cannot reset your password via the reset link. You must do it via your<> </>
                        <Link href="/profile">
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <a>profile</a>
                        </Link>.
                    </p>
                }

                {!session &&
                    <>
                        <p>
                            <strong>Note:</strong> Your password reset link expires 60 minutes after your request was submitted.
                        </p>

                        <PasswordResetForm
                            handleUpdatePasswordSubmit={handleUpdatePasswordSubmit}
                            passwordError={passwordError}
                            newPassword={newPassword}
                            setNewPassword={setNewPassword}
                            repeatPassword={repeatPassword}
                            setrepeatPassword={setrepeatPassword}
                        />
                    </>
                }
            </article>
        </>
    );
}
