import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Loading from '../components/Loading';
import RichTextEditor from '../components/RichTextEditor';
// import parse, { domToReact } from 'html-react-parser';
// import DOMPurify from 'dompurify';

import styles from '../styles/forum.module.css';

export default function NewTopic() {
    const { data: session, status } = useSession();
    const loading = status === 'loading';

    const router = useRouter();

    // const [title, setTitle] = useState('');
    const [initialContent, setInitialContent] = useState(null);
    const [content, setContent] = useState(null);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (session) {
            setIsLoading(true);
            const fetchData = async () => {
                const res = await fetch('/api/forum/test/6952')
                    .then(res => res.json())
                    .catch(error => console.error(error));

                if (res) {
                    setInitialContent(res.content);
                } else {
                    setInitialContent(null);
                    setError('An error occurred fetching data.');
                }
                setIsLoading(false);
            };
            fetchData();
        }
    }, [session]);

    if (typeof window !== 'undefined' && loading) return null;

    if (!session) {
        router.push('/login?url=/edit-post');
    }

    return (
        <>
            <Head>
                <title>
                    RML Baseball - Edit Post
                </title>
            </Head>

            <section className={styles.forumPageWrapper}>
                <h2 className="page-heading">
                    Edit Post
                </h2>

                {isLoading && <Loading />}

                {error && <p className="error">{error}</p>}

                {/* {content &&
                    <>
                        {parse(DOMPurify.sanitize(content))}
                    </>
                } */}

                {initialContent &&
                    <RichTextEditor initialContent={null} setContent={setContent} />
                }

                <aside>
                    <textarea className="editor-textarea"
                        disabled
                        value={content || ''}
                    />
                </aside>
            </section>
        </>
    );
}
