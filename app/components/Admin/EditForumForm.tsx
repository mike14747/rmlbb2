'use client';

import { useState, FormEvent } from 'react';
import Button from '@/components/Button';
import Spinner from '../Spinner';
import FormInputForForumName from './FormInputForForumName';
import FormInput from '../FormInput';
import FormInputForActive from './FormInputForActive';
import { ForumForEdit } from '@/types/forum-types';
import { StatusCodeObj } from '@/types/misc-types';

// import styles from '@/styles/admin.module.css';

const statusCodeErrorMessages: StatusCodeObj = {
    400: 'An error occurred. New forum info may not be in the proper format.',
    401: 'An error occurred. You need to be logged in to perform this action.',
    403: 'An error occurred. You do not have permission to perform this action.',
    404: 'An error occurred. Forum was not found.',
    409: 'An error occurred. The forum name you submitted is already in use.',
    500: 'A server error occurred. Please try your update again.',
};

export default function EditForumForm({ forum }: { forum: ForumForEdit }) {
    const [forumName, setForumName] = useState(forum.name);
    const [order, setOrder] = useState<string>(forum.order.toString());
    const [active, setActive] = useState(forum.active);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsSubmitting(true);

        // const res = await fetch('/api/forum/edit-forum', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json;charset=utf-8',
        //     },
        //     body: JSON.stringify({
        //         _id: forum._id,
        //         name: forumName,
        //         order,
        //         active,
        //     }),
        // });

        const res = { status: 400 };

        setIsSubmitting(false);

        if (!res) setError(statusCodeErrorMessages[500]);

        if (res.status === 200) {
            setError('');
            setSuccessMessage('The forum: "' + forumName + '" has been successfully updated!');
        }

        if (res && res.status !== 200) {
            setError(statusCodeErrorMessages[res.status] || 'An unknown error occurred');
            setSuccessMessage('');
        }
    };

    return (
        <>
            {isSubmitting && <Spinner />}

            {error && <p className="error2">{error}</p>}

            {successMessage && <p className="success2">{successMessage}</p>}

            <form onSubmit={handleSubmit}>
                <FormInputForForumName id={forum._id} forumName={forumName} setForumName={setForumName} />

                <FormInput
                    id={'order' + forum._id}
                    label="Order"
                    name="order"
                    value={order}
                    type="number"
                    min={1}
                    handleChange={(e) => setOrder(e.target.value)}
                />

                <FormInputForActive id={forum._id} active={active} setActive={setActive} />

                <Button type="submit" size="medium" variant="contained" theme="primary">Submit</Button>
            </form>
        </>
    );
}
