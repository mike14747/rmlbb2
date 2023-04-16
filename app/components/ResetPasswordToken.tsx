'use client';

import { useRef, useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import FormInputForNewPassword from '@/components/FormInputForNewPassword';
import Button from '@/components/Button';
import Spinner from '@/components/Spinner';
import { StatusCodeObj } from '@/types/misc-types';

import styles from '@/styles/profile.module.css';

type PropsType = {
    userId: string;
    resetPasswordToken: string;
}

const statusCodeErrorMessages: StatusCodeObj = {
    400: 'An error occurred. New password is not in the proper format.',
    401: 'An error occurred. You do not have permission to make this update.',
    406: 'An error occurred. User or reset password token do not exist.',
    412: 'An error occurred. The reset password token has expired.',
    500: 'A server error occurred. Please try your update again.',
};

export default function ResetPasswordToken({ userId, resetPasswordToken }: PropsType) {
    const router = useRouter();

    const password = useRef<string>('');
    const repeatPassword = useRef<string>('');

    const [error, setError] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isSuccessfullyUpdated, setIsSuccessfullyUpdated] = useState<boolean>(false);
    const form = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (isSuccessfullyUpdated) {
            router.push('/reset-password-success');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccessfullyUpdated]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsSubmitting(true);

        if (password.current !== repeatPassword.current) {
            setError('Passwords do not match.');
            return;
        }

        const res = await fetch(`/api/users/${userId}/change-password`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({ userId, resetPasswordToken, password: password.current }),
        }).catch(error => console.error(error.name + ': ' + error.message));

        if (res?.status === 200) {
            setError('');
            setIsSuccessfullyUpdated(true);
            if (form.current) form.current.reset();
        } else {
            setIsSubmitting(false);
        }

        if (res && res?.status !== 200) setError(statusCodeErrorMessages[res.status] || 'An unknown error occurred');

        if (!res) setError(statusCodeErrorMessages[500]);
    };

    return (
        <>
            {isSubmitting && <Spinner size="large" />}

            <p>
                <strong>Note:</strong> Your password reset link expires 60 minutes after your request was submitted.
            </p>

            <form className={styles.updateGroup} onSubmit={handleSubmit}>
                {error && <p className={styles.error}>{error}</p>}

                <FormInputForNewPassword password={password} repeatPassword={repeatPassword} />

                <Button type="submit" size="medium" variant="contained" theme="primary">Apply</Button>
            </form>
        </>
    );
}
