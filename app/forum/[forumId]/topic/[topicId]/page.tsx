'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Spinner from '@/components/Spinner';
// import parse from 'html-react-parser';
// import DOMPurify from 'dompurify';

import styles from '@/styles/forum.module.css';

export default function Topic() {
    const { data: session, status } = useSession();
    const loading = status === 'loading';

    const router = useRouter();
    const pathname = usePathname();
    console.log({ pathname });

    const forumId = 7;
    const topicId = 1490;
    const page = 1;

    const [topic, setTopic] = useState(null);
    // const [replies, setReplies] = useState(null);
    const [, setReplies] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // console.log({ replies });

    useEffect(() => {
        if (session) {
            setIsLoading(true);

            const url = `/api/forum/${forumId}/topic/${topicId}${page && `?page=${page}`}`;

            fetch(url)
                .then(res => res.ok ? res.json() : Promise.reject(res.status))
                .then(data => {
                    setTopic(data.topicData);
                    setReplies(data.repliesData);
                    setError('');
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
        }

        if (!session) router.push(`/login?callbackUrl=/forum/topic/${topicId}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session, forumId, topicId, page]);

    if (typeof window !== 'undefined' && loading) return null;

    if (session) {
        return (
            <main id="main">
                <article className={styles.forumPageWrapper}>

                    {error && <p className="error">{error}</p>}

                    {isLoading && <Spinner size="large" />}

                    {topic &&
                        <>
                            <p className="small">
                                <Link href="/forum">
                                    Forum Index
                                </Link>

                                <span className={styles.arrow}> &#10139; </span>

                                <Link href={`/forum/${forumId}`}>
                                    {/* {topic.forumName} */}
                                </Link>

                                {/* <span className={styles.arrow}> &#10139; {topic.title}</span> */}
                            </p>

                            {/* <h2 className={'page-heading ' + styles.forumPageHeading}>
                                {topic.title}
                            </h2> */}

                            <p className="small">
                                <>&#128221; </>
                                <Link href={`/forum/${forumId}/topic/new-topic`} passHref>
                                    <strong>Reply to Topic</strong>
                                </Link>
                            </p>

                            <div className={styles.topicContainer}>
                                <div className={styles.topicHeading}>
                                    <p className={styles.topicTitle}>
                                        {/* {topic.title} */}
                                    </p>

                                    <p className={styles.topicDetails}>
                                        {/* by: {topic.username} &#10139; <span className={styles.topicDate}>{topic.dateStr}</span> */}
                                    </p>
                                </div>

                                <div className={styles.topicBody}>
                                    {/* {parse(DOMPurify.sanitize(topic.content))} */}
                                </div>
                            </div>

                            {/* {replies?.length > 0 &&
                                replies.map(reply => (
                                    <div key={reply._id} className={styles.topicContainer}>
                                        <div className={styles.topicHeading}>
                                            <p className={styles.topicTitle}>
                                                {reply.subject}
                                            </p>

                                            <p className={styles.topicDetails}>
                                                by: {reply.username} &#10139; <span className={styles.topicDate}>{reply.dateStr}</span>
                                            </p>
                                        </div>

                                        <div className={styles.topicBody}>
                                            {parse(DOMPurify.sanitize(reply.content))}
                                        </div>
                                    </div>
                                ))
                            } */}
                        </>
                    }
                </article>
            </main>
        );
    }

    return null;
}
