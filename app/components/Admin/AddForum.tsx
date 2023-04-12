'use client';

import { useRef, useState, FormEvent, ChangeEvent } from 'react';
import FormInput from '@/components/FormInput';
import { forumNamePattern, forumNameErrorMsg } from '@/lib/formInputPatterns';
import Button from '@/components/Button';
import Spinner from '@/components/Spinner';
import { StatusCodeObj } from '@/types/misc-types';

import styles from '@/styles/admin.module.css';

const statusCodeErrorMessages: StatusCodeObj = {
    400: 'An error occurred. New forum name is not in the proper format.',
    401: 'An error occurred. You do not have permission to add a forum.',
    409: 'An error occurred. The forum name you submitted is already in use.',
    500: 'A server error occurred. Please try your update again.',
};

export default function AddForum() {
    const [forumName, setForumName] = useState<string>('');
    const [active, setActive] = useState<boolean>(true);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState<string>('');
    const form = useRef<HTMLFormElement>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsSubmitting(true);
        setSuccessMessage('');

        const res = await fetch('/api/admin/add-forum', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({ name: forumName, active }),
        });

        setIsSubmitting(false);

        if (!res) setError(statusCodeErrorMessages[500]);

        if (res.status === 201) {
            setActive(true);
            setError('');
            setSuccessMessage(`The new forum "${forumName}" has been successfully added!`);
            setForumName('');
        }

        if (res.status !== 201) setError(statusCodeErrorMessages[res.status] || 'An unknown error occurred');
    };

    return (
        <>
            {isSubmitting && <Spinner size="large" />}

            {error && <p className="error2">{error}</p>}

            {successMessage && <p className="success2">{successMessage}</p>}

            <form ref={form} className={styles.updateGroup} onSubmit={handleSubmit}>
                <FormInput
                    id="forumName"
                    label="Forum Name"
                    name="forumName"
                    value={forumName}
                    type="text"
                    required={true}
                    handleChange={(e: ChangeEvent<HTMLInputElement>) => setForumName(e.target.value)}
                    pattern={forumNamePattern}
                    errorMsg={forumNameErrorMsg}
                />

                <FormInput
                    id="active"
                    label="Active"
                    name="active"
                    type="checkbox"
                    checked={active}
                    handleChange={() => setActive(!active)}
                />

                <div className={styles.submitButtonWrapper}>
                    <Button type="submit" size="medium" variant="contained" theme="primary">Submit</Button>
                </div>
            </form>
        </>

    );
}
