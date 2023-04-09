'use client';

import { useState, useRef, FormEvent } from 'react';
import Spinner from '@/components/Spinner';
// import RichTextEditor from '@/components/RichTextEditor';
// import SunEditorComp from '@/components/Sun/SunEditor';
import TiptapEditor from '@/components/Tiptap/TiptapEditor';
// import parse from 'html-react-parser';
// import sanitizeHtml from 'sanitize-html';
import { ForumTopicToClient } from '@/types/forum-types';
import { StatusCodeObj } from '@/types/misc-types';

// import styles from '@/styles/forum.module.css';

const statusCodeErrorMessages: StatusCodeObj = {
    400: 'An error occurred. Input(s) are not in the proper format.',
    401: 'An error occurred. You do not have permission for this action.',
    500: 'A server error occurred. Please try your update again.',
};

export default function EditTopicForm({ topicData }: { topicData: ForumTopicToClient }) {
    // const [title, setTitle] = useState('');
    const [initialContent, setInitialContent] = useState('');
    const [content, setContent] = useState('');
    const form = useRef<HTMLFormElement>(null);

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [isSuccessful, setIsSucessful] = useState<boolean>(false);

    const submitEdittedTopic = async (e: FormEvent<HTMLFormElement>) => {
        // const submitTopic = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        console.log('form is being submitted');

        setIsSubmitting(true);

        // const res = await fetch('/api/forums/' + forumId + '/topic/new-topic', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json;charset=utf-8',
        //     },
        //     body: JSON.stringify({ title, content }),
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

            {/* {content &&
                    <>
                        {parse(sanitizeHtml(content))}
                    </>
                } */}

            {initialContent &&
                <TiptapEditor initialContent={initialContent} setContent={setContent} />
            }

            <textarea className="editor-textarea"
                disabled
                value={content || ''}
            />
        </section>
    );
}

// const res = await fetch('/api/forum/test/6952')
