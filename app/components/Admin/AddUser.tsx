'use client';

import { useRef, useState, FormEvent } from 'react';
import FormInputForUsername from '../FormInputForUsername';
import FormInputForEmail from '../FormInputForEmail';
import FormInputForNewPassword from '../FormInputForNewPassword';
import FormInputForActive from './FormInputForActive';
import Button from '@/components/Button';
import Spinner from '@/components/Spinner';
import { StatusCodeObj } from '@/types/misc-types';

import styles from '@/styles/admin.module.css';

const statusCodeErrorMessages: StatusCodeObj = {
    400: 'An error occurred. New user info may not be in the proper format.',
    401: 'An error occurred. You do not have permission to add a user.',
    409: 'An error occurred. The username you submitted is already in use.',
    500: 'A server error occurred. Please try your update again.',
};

export default function AddUser() {
    const username = useRef<string>('');
    const email = useRef<string>('');
    const password = useRef<string>('');
    const repeatPassword = useRef<string>('');
    const [active, setActive] = useState<boolean>(true);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState<string>('');
    const form = useRef<HTMLFormElement>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsSubmitting(true);
        setSuccessMessage('');

        const res = await fetch('/api/admin/add-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({ username: username.current, emai: email.current, password: password.current, active }),
        });

        setIsSubmitting(false);

        if (!res) setError(statusCodeErrorMessages[500]);

        if (res.status === 201) {
            setActive(true);
            setError('');
            setSuccessMessage(`The new user "${username.current}" has been successfully added!`);
            if (form.current) form.current.reset();
        }

        if (res && res.status !== 201) setError(statusCodeErrorMessages[res.status] || 'An unknown error occurred');
    };

    return (
        <>
            {isSubmitting && <Spinner size="large" />}

            {error && <p className="error2">{error}</p>}

            {successMessage && <p className="success2">{successMessage}</p>}

            <form ref={form} className={styles.updateGroup} onSubmit={handleSubmit}>
                <FormInputForUsername username={username} />

                <FormInputForEmail email={email} />

                <FormInputForNewPassword password={password} repeatPassword={repeatPassword} />

                <FormInputForActive id={null} active={active} setActive={setActive} />

                <div className={styles.submitButtonWrapper}>
                    <Button type="submit" size="medium" variant="contained" theme="primary">Submit</Button>
                </div>
            </form>
        </>

    );
}
