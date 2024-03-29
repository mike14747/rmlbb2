'use client';

import { useState, useRef, FormEvent, RefObject } from 'react';
import Link from 'next/link';
import Spinner from '@/components/Spinner';
import Button from '@/components/Button';
import FormInputForTopicTitle from '@/components/Forum/FormInputForTopicTitle';
import TiptapEditor from '@/components/Tiptap/TiptapEditor';
import { StatusCodeObj } from '@/types/misc-types';

import styles from '@/styles/forum.module.css';

type NewTopicProps = {
    userId: string;
    username: string;
    forumId: number;
    forumName: string;
}

const statusCodeErrorMessages: StatusCodeObj = {
    400: 'An error occurred. Input(s) are not in the proper format.',
    401: 'An error occurred. You do not have permission for this action.',
    500: 'A server error occurred. Please try your update again.',
};

export default function NewTopic({ userId, username, forumId, forumName }: NewTopicProps) {
    console.log({ userId, username });
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const form = useRef<HTMLFormElement>(null);

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [isSuccessful, setIsSucessful] = useState<boolean>(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        // const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        console.log('form is being submitted');

        setIsSubmitting(true);

        const res = await fetch(`/api/forums/${forumId}/topic/new-topic`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({ userId, username, forumId, forumName, title, content }),
        });

        setIsSubmitting(false);

        if (!res) setError(statusCodeErrorMessages[500]);

        if (res.status === 201) {
            setError('');
            setIsSucessful(true);
            if (form.current) form.current.reset();
        }

        if (res.status !== 201) setError(statusCodeErrorMessages[res.status] || 'An unknown error occurred');
    };

    return (
        <section>
            {isSubmitting && <Spinner />}

            {error && <p className="error">{error}</p>}

            {isSuccessful && <p className={styles.success}>Your new topic was successfully added!</p>}

            {forumName && !isSuccessful &&
                <>
                    <p>
                        <span className="muted"><small><em>forum: </em></small></span>
                        <Link href={`/forum/${forumId}`}>
                            {forumName}
                        </Link>
                    </p>

                    {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
                    <form
                        ref={form as RefObject<HTMLFormElement>}
                        onSubmit={handleSubmit}
                        onKeyDown={(e) => {
                            // prevent the enter key from submitting the form
                            e.key === 'Enter' && e.preventDefault();
                        }}
                    >
                        <FormInputForTopicTitle title={title} setTitle={setTitle}/>

                        <TiptapEditor initialContent={''} setContent={setContent} />

                        <Button type="submit" size="medium" variant="contained" theme="primary">Submit</Button>
                    </form>
                </>
            }

            <div>
                <textarea className="editor-textarea"
                    disabled
                    value={content}
                />
            </div>
        </section>
    );
}
