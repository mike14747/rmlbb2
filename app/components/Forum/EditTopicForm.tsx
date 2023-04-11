'use client';

import { useState, useRef, FormEvent, RefObject } from 'react';
import Spinner from '@/components/Spinner';
// import RichTextEditor from '@/components/RichTextEditor';
// import SunEditorComp from '@/components/Sun/SunEditor';
import TiptapEditor from '@/components/Tiptap/TiptapEditor';
// import parse from 'html-react-parser';
// import sanitizeHtml from 'sanitize-html';
import { ForumTopicToClient } from '@/types/forum-types';
import { StatusCodeObj } from '@/types/misc-types';
import Button from '../Button';
import FormInputForTopicTitle from '@/components/Forum/FormInputForTopicTitle';

import styles from '@/styles/forum.module.css';

const statusCodeErrorMessages: StatusCodeObj = {
    400: 'An error occurred. Input(s) are not in the proper format.',
    401: 'An error occurred. You do not have permission for this action.',
    500: 'A server error occurred. Please try your update again.',
};

export default function EditTopicForm({ topicData }: { topicData: ForumTopicToClient }) {
    const [title, setTitle] = useState(topicData.title);
    const [content, setContent] = useState(topicData.content);
    const form = useRef<HTMLFormElement>(null);

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [isSuccessful, setIsSucessful] = useState<boolean>(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        // const submitTopic = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        console.log('form is being submitted');
        console.log('title:', title);

        setIsSubmitting(true);

        // const res = await fetch(`/api/forums/${topicData.forum_id}/topic/edit-topic`, {
        //     method: 'PUT',
        //     headers: {
        //         'Content-Type': 'application/json;charset=utf-8',
        //     },
        //     body: JSON.stringify({ id: topicData._id, user_id: topicData.user_id, title, content }),
        // });

        const res = { status: 400 };

        setIsSubmitting(false);

        if (!res) setError(statusCodeErrorMessages[500]);

        if (res.status === 200) {
            setError('');
            setIsSucessful(true);
            if (form.current) form.current.reset();
        }

        if (res.status !== 200) setError(statusCodeErrorMessages[res.status] || 'An unknown error occurred');
    };

    return (
        <section>
            {isSubmitting && <Spinner />}

            {error && <p className="error">{error}</p>}

            {isSuccessful && <p className={styles.success}>Your new topic was successfully added!</p>}

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

                <TiptapEditor initialContent={content} setContent={setContent} />

                <Button type="submit" size="medium" variant="contained" theme="primary">Submit</Button>
            </form>
        </section>
    );
}

// const res = await fetch('/api/forum/test/6952')
