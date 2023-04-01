'use client';

import { useRef, useState, FormEvent } from 'react';
import Button from '../Button';
import Spinner from '../Spinner';
import FormInputForNewPassword from '../FormInputForNewPassword';
import processStatusCodeWithSignout from '../../../lib/helpers/processStatusCodeWithSignout';
import { StatusCodeObj } from '../../../types';

import styles from '../../../styles/profile.module.css';

const statusCodeErrorMessages: StatusCodeObj = {
    400: 'An error occurred. New password is not in the proper format.',
    401: 'An error occurred. You do not have permission to make this update.',
    404: 'An error occurred. User was not found.',
    500: 'A server error occurred. Please try your update again.',
};

export default function ChangePassword({ id }: { id: string }) {
    const password = useRef<string>('');
    const repeatPassword = useRef<string>('');
    const [error, setError] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleChangePasswordSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password.current !== repeatPassword.current) {
            setError('Passwords do not match.');
            return;
        }

        setIsSubmitting(true);

        const res = await fetch('/api/users/' + id + '/change-password', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({ password: password.current }),
        }).catch(error => console.error(error.name + ': ' + error.message));

        processStatusCodeWithSignout(res, statusCodeErrorMessages, setError, setIsSubmitting);
    };

    return (
        <div className={styles.updateContainer}>
            <div className={styles.updateHeading}>
                <h3>Change your password:</h3>

                <p className={styles.note}>
                    <strong>Note:</strong> changing your password will log you out.
                </p>
            </div>

            <form className={styles.updateGroup} onSubmit={handleChangePasswordSubmit}>
                {isSubmitting && <Spinner />}

                {error && <p className={styles.error}>{error}</p>}

                <FormInputForNewPassword password={password} repeatPassword={repeatPassword} />

                <Button type="submit" size="medium" variant="contained" theme="secondary">Apply</Button>
            </form>
        </div>
    );
}
