'use client';

import { useRef, useState, FormEvent } from 'react';
import FormInputForForumName from './FormInputForForumName';
import FormInputForActive from './FormInputForActive';
import Button from '@/components/Button';
import Spinner from '../Spinner';
import { StatusCodeObj } from '@/types/index';

import styles from '@/styles/admin.module.css';

const statusCodeErrorMessages: StatusCodeObj = {
    400: 'An error occurred. New forum name is not in the proper format.',
    401: 'An error occurred. You do not have permission to add a forum.',
    409: 'An error occurred. The forum name you submitted is already in use.',
    500: 'A server error occurred. Please try your update again.',
};

export default function AddForum() {
    const forumName = useRef<string>('');
    const [active, setActive] = useState<boolean>(true);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState<string>('');
    const form = useRef<HTMLFormElement>(null);

    const handleNewForumNameSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsSubmitting(true);
        setSuccessMessage('');

        const res = await fetch('/api/forum/add-forum', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({ name: forumName.current, active }),
        });

        setIsSubmitting(false);

        if (!res) setError(statusCodeErrorMessages[500]);

        if (res.status === 201) {
            setActive(true);
            setError('');
            setSuccessMessage(`The new forum "${forumName.current}" has been successfully added!`);
            if (form.current) form.current.reset();
        }

        if (res && res.status !== 201) setError(statusCodeErrorMessages[res.status] || 'An unknown error occurred');
    };

    return (
        <>
            <p>This is the AddForum component.</p>

            <p>It is a client component that takes no props.</p>

            <form ref={form} className={styles.updateGroup} onSubmit={handleNewForumNameSubmit}>
                {isSubmitting && <Spinner size="large" />}

                {error && <p className="error2">{error}</p>}

                {successMessage && <p className="success2">{successMessage}</p>}

                <FormInputForForumName forumName={forumName} />

                <FormInputForActive id={null} active={active} setActive={setActive} />

                <div className={styles.submitButtonWrapper}>
                    <Button type="submit" size="medium" variant="contained" theme="primary">Submit</Button>
                </div>
            </form>
        </>

    );
}
