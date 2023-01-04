import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import Loading from '../../../../components/Loading';
import Button from '../../../../components/Button';
import FormInputForTopicTitle from '../../../../components/FormInputForTopicTitle';
import TiptapEditor from '../../../../components/TiptapEditor';

import styles from '../../../../styles/forum.module.css';

export default function NewTopic() {
    const { data: session, status } = useSession();
    const loading = status === 'loading';

    const router = useRouter();
    const forumId = router.query.forumId;

    const [forumName, setForumName] = useState(null);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const [isSuccessful, setIsSucessful] = useState(false);

    const submitTopic = async (e) => {
        e.preventDefault();

        const res = await fetch('/api/forum/' + forumId + '/topic/new-topic', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({ title, content }),
        });

        if (res.status !== 200) {
            setIsSucessful(false);
            res.status === 400 && setError('An error occurred. Input(s) are not in the proper format.');
            res.status === 401 && setError('An error occurred. You do not have permission for this action.');
            res.status === 404 && setError('An error occurred. Resource not found.');
            res.status === 500 && setError('A server error occurred. Please try again.');
        }

        if (res.status === 200) {
            setTitle('');
            setContent('');
            setError(null);
            setIsSucessful(true);
            console.log('Success!');
        }
    };

    useEffect(() => {
        if (session) {
            setIsLoading(true);
            const fetchData = async () => {
                const data = await fetch('/api/forum/' + forumId + '/get-forum-name')
                    .then(res => res.json())
                    .catch(error => console.error(error));
                if (data) {
                    setForumName(data.name);
                } else {
                    setForumName(null);
                    setError('An error occurred fetching data.');
                }
                setIsLoading(false);
            };
            fetchData();
        }
    }, [session, forumId]);

    if (typeof window !== 'undefined' && loading) return null;

    if (!session) router.push('/login?callbackUrl=/forum');

    if (session) {
        return (
            <>
                <Head>
                    <title>
                        RML Baseball - New Topic
                    </title>
                </Head>

                <article className={styles.forumPageWrapper}>
                    <h2 className={'page-heading ' + styles.forumPageHeading}>
                        New Topic
                    </h2>

                    {isLoading && <Loading />}

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

                            <form onSubmit={submitTopic}>
                                <FormInputForTopicTitle title={title} setTitle={setTitle} />

                                <TiptapEditor setContent={setContent} />

                                <Button type="submit" size="medium" variant="contained" style="primary">Submit</Button>
                            </form>
                        </>
                    }

                    <aside>
                        <textarea className="editor-textarea"
                            disabled
                            value={content}
                        />
                    </aside>
                </article>
            </>
        );
    }

    return null;
}
