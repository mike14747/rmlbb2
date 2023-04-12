'use client';

import { useState } from 'react';
import Button from '@/components/Button';
import Spinner from '../Spinner';
import FormInput from '../FormInput';
import { ForumListForEdit } from '@/types/forum-types';
import { StatusCodeObj } from '@/types/misc-types';

import styles from '@/styles/admin.module.css';

const statusCodeErrorMessages: StatusCodeObj = {
    400: 'An error occurred. New forum info may not be in the proper format.',
    401: 'An error occurred. You do not have permission to edit a forum.',
    409: 'An error occurred. The forum name you submitted is already in use.',
    500: 'A server error occurred. Please try your update again.',
};

export default function EditForum({ forumList }: { forumList: ForumListForEdit[] }) {
    const [forums, setForums] = useState(forumList);
    const [updatedForums] = useState(forumList);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // function toggleActive(id: number, active: boolean) {
    //     setUpdatedForums(updatedForums.map(forum => forum._id === id ? { ...forum, active } : forum));
    // }

    // function handleChangeForumName(id: number, name: string) {
    //     setUpdatedForums(updatedForums.map(forum => forum._id === id ? { ...forum, name } : forum));
    // }

    const handleUpdatedForumSubmit = async (_id: number, name: string, order: number, active: boolean) => {
        setIsSubmitting(true);

        const res = await fetch('/api/forum/edit-forum', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({
                _id,
                name,
                order,
                active,
            }),
        });

        setIsSubmitting(false);

        if (!res) setError(statusCodeErrorMessages[500]);

        if (res.status === 200) {
            setForums(forums.map(forum => forum._id === _id ? { ...forum, name, active } : forum));
            setError('');
            setSuccessMessage('The forum: "' + name + '" has been successfully updated!');
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

            {updatedForums &&
                updatedForums.map((forum, index) => (
                    <div className={styles.forumRow} key={forum._id}>
                        <div className={styles.gridName}>
                            <FormInput id={forum._id.toString()} name={forum.name} value={forum.name} />
                        </div>
                        <div className={styles.gridActive}>
                            <FormInput
                                id="active"
                                label="Active"
                                name="active"
                                type="checkbox"
                                checked={forum.active}
                            />
                        </div>
                        {(forums[index].active !== updatedForums[index].active || forums[index].name !== updatedForums[index].name) &&
                            <div className={`${styles.updateButtonWrapper} ${styles.gridUpdate}`}>
                                <Button type="button" size="small" variant="contained" theme="primary" onClick={() => handleUpdatedForumSubmit(forum._id, forum.name, 20, forum.active)}>
                                    Update
                                </Button>
                            </div>
                        }
                    </div>
                ))
            }

            <p>This is the unfinished edit-forum page.</p>

            <p>You are seeing this page because you are logged in with the role of admin.</p>
        </>
    );
}
