import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import Loading from '../../../../components/Loading';
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';

import styles from '../../../../styles/forum.module.css';

export default function Topic() {
    const { data: session, status } = useSession();
    const loading = status === 'loading';

    const router = useRouter();
    const forumId = router.query.forumId;
    const topicId = router.query.topicId;
    const page = router.query?.page;

    const [topic, setTopic] = useState(null);
    const [replies, setReplies] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    console.log({ replies });

    useEffect(() => {
        const abortController = new AbortController();

        if (session) {
            setIsLoading(true);

            const url = `/api/forum/${forumId}/topic/${topicId}${page && `?page=${page}`}`;

            fetch(url)
                .then(res => res.ok ? res.json() : Promise.reject(res.status))
                .then(data => {
                    setTopic(data.topicData);
                    setReplies(data.repliesData);
                    setError(null);
                })
                .catch(error => {
                    setTopic(null);
                    if (error.name === 'AbortError') {
                        console.error('Data fetching was aborted!');
                    } else if (error === 400) {
                        setError('Bad request... no data was found!');
                    } else {
                        console.error(error);
                        setError('An error occurred fetching data.');
                    }
                })
                .finally(() => setIsLoading(false));

            return () => abortController.abort();
        }
    }, [session, forumId, topicId, page]);

    if (typeof window !== 'undefined' && loading) return null;

    if (!session) router.push(`/login?url=/forum/topic/${topicId}`);

    if (session) {
        return (
            <>
                <Head>
                    <title>
                        RML Baseball - Forum
                    </title>
                </Head>

                <article className={styles.forumPageWrapper}>

                    {error && <p className="error">{error}</p>}

                    {isLoading && <Loading />}

                    {topic &&
                        <>
                            <p className="small">
                                <Link href="/forum">
                                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                    <a>
                                        Forum Index
                                    </a>
                                </Link>

                                <span className={styles.arrow}> &#10139; </span>

                                <Link href={`/forum/${forumId}`}>
                                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                    <a>
                                        {topic.forumName}
                                    </a>
                                </Link>

                                <span className={styles.arrow}> &#10139; {topic.title}</span>
                            </p>

                            <h2 className={'page-heading ' + styles.forumPageHeading}>
                                {topic.title}
                            </h2>

                            <p className="small">
                                <>&#128221; </>
                                <Link href={`/forum/${forumId}/topic/new-topic`}>
                                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                    <a>
                                        <strong>Reply to Topic</strong>
                                    </a>
                                </Link>
                            </p>

                            <div className={styles.topicContainer}>
                                <div className={styles.topicHeading}>
                                    <p className={styles.topicTitle}>
                                        {topic.title}
                                    </p>

                                    <p className={styles.topicDetails}>
                                        by: {topic.username} &#10139; <span className={styles.topicDate}>{topic.date}</span>
                                    </p>
                                </div>

                                <div className={styles.topicBody}>
                                    {parse(DOMPurify.sanitize(topic.content))}
                                </div>

                            </div>
                        </>
                    }
                </article>
            </>
        );
    }

    return null;
}
