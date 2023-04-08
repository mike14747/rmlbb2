'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Spinner from '@/components/Spinner';
// import RichTextEditor from '@/components/RichTextEditor';
// import SunEditorComp from '@/components/Sun/SunEditor';
import TiptapEditor from '@/components/Tiptap/TiptapEditor';
// import parse from 'html-react-parser';
// import sanitizeHtml from 'sanitize-html';

import styles from '@/styles/forum.module.css';

export default function NewTopic() {
    const { data: session, status } = useSession();
    const loading = status === 'loading';

    const router = useRouter();

    // const [title, setTitle] = useState('');
    const [initialContent, setInitialContent] = useState('');
    const [content, setContent] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (session) {
            setIsLoading(true);
            const fetchData = async () => {
                const res = await fetch('/api/forum/test/6952')
                    .then(res => res.json())
                    .catch(error => console.error(error));

                if (res) {
                    setInitialContent(res.content);
                    setContent(res.content);
                } else {
                    setInitialContent('');
                    setError('An error occurred fetching data.');
                }
                setIsLoading(false);
            };
            fetchData();
        }

        if (!session) {
            router.push('/login?callbackUrl=/edit-post');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session]);

    if (typeof window !== 'undefined' && loading) return null;

    return (
        <main id="main">
            <article className={styles.forumPageWrapper}>
                <h2 className="page-heading">
                    Edit Post
                </h2>

                {isLoading && <Spinner size="large" />}

                {error && <p className="error">{error}</p>}

                {/* {content &&
                    <>
                        {parse(sanitizeHtml(content))}
                    </>
                } */}

                {initialContent &&
                    <TiptapEditor initialContent={initialContent} setContent={setContent} />
                }

                <aside>
                    <textarea className="editor-textarea"
                        disabled
                        value={content || ''}
                    />
                </aside>
            </article>
        </main>
    );
}
