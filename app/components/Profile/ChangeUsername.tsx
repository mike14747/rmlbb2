'use client';

import { useRef, useState, FormEvent } from 'react';
import Button from '../Button';
import Spinner from '../Spinner';
import FormInputForUsername from '../FormInputForUsername';
import processStatusCodeWithSignout from '../../../lib/helpers/processStatusCodeWithSignout';
import { StatusCodeObj } from '../../../types';

import styles from '../../../styles/profile.module.css';

const statusCodeErrorMessages: StatusCodeObj = {
    400: 'An error occurred. New username is not in the proper format.',
    401: 'An error occurred. You do not have permission to make this update.',
    404: 'An error occurred. User was not found.',
    406: 'An error occurred. You cannot change your username to the same one already in the system.',
    409: 'An error occurred. The username you submitted is already in use.',
    500: 'A server error occurred. Please try your update again.',
};

export default function ChangeUsername({ id }: { id: string }) {
    const username = useRef<string>('');
    const [error, setError] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleChangeUsernameSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsSubmitting(true);

        const res = await fetch('/api/users/' + id + '/change-username', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({ username: username.current }),
        }).catch(error => console.error(error.name + ': ' + error.message));

        processStatusCodeWithSignout(res, statusCodeErrorMessages, setError, setIsSubmitting);
    };

    return (
        <div className={styles.updateContainer}>
            <div className={styles.updateHeading}>
                <h3>Change your username:</h3>

                <p className={styles.note}>
                    <strong>Note:</strong> changing your username will log you out.
                </p>
            </div>

            <form className={styles.updateGroup} onSubmit={handleChangeUsernameSubmit}>
                {isSubmitting && <Spinner />}

                {error && <p className={styles.error}>{error}</p>}

                <FormInputForUsername username={username} />

                <Button type="submit" size="medium" variant="contained" theme="primary">Apply</Button>
            </form>
        </div>
    );
}
