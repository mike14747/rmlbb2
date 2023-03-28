import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import Loading from '../../../components/Loading';

import styles from '../../../styles/forum.module.css';

export default function Forum() {
    const { data: session, status } = useSession();
    const loading = status === 'loading';

    const router = useRouter();
    const forumId = router.query.forumId;

    const [topicList, setTopicList] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();

        if (session) {
            setIsLoading(true);

            fetch('/api/forum/' + forumId, { signal: abortController.signal })
                .then(res => res.json())
                .then(data => {
                    setTopicList(data);
                    setError(null);
                    setIsLoading(false);
                })
                .catch(error => {
                    if (error.name === 'AbortError') {
                        console.error('Data fetching was aborted!');
                    } else {
                        console.error(error);
                        setTopicList(null);
                        setError('An error occurred fetching data.');
                        setIsLoading(false);
                    }
                });
        } else {
            setTopicList(null);
        }

        return () => abortController.abort();
    }, [session, forumId]);

    if (typeof window !== 'undefined' && loading) return null;

    if (!session) {
        router.push(`/login?callbackUrl=/forum/${forumId}`);
    }

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

                    {!isLoading && (!topicList || topicList.length === 0) &&
                        <p className="error">An error occurred. Could not find the selected forum.</p>
                    }

                    {topicList?.length > 0 &&
                        <>
                            <p className="small">
                                <Link href="/forum">
                                    Forum Index
                                </Link>
                                <span className={styles.arrow}> &#10139; {topicList[0].forumName}</span>
                            </p>

                            <h2 className={'page-heading ' + styles.forumPageHeading}>
                                {topicList[0].forumName}
                            </h2>

                            <p className="small">
                                <>&#128221; </>
                                <Link href={`/forum/${forumId}/topic/new-topic`} passHref>
                                    <strong>New Topic</strong>
                                </Link>
                            </p>

                            <div className={styles.forumsContainer}>
                                <div className={styles.forumsHeadingRow}>
                                    <div className={`${styles.forumsHeadingItem} ${styles.forumsHeadingItem1}`}>Topic</div>
                                    <div className={`${styles.forumsHeadingItem} ${styles.forumsHeadingItem2}`}>Replies</div>
                                    <div className={`${styles.forumsHeadingItem} ${styles.forumsHeadingItem3}`}>Views</div>
                                    <div className={`${styles.forumsHeadingItem} ${styles.forumsHeadingItem4}`}>Last Reply</div>
                                </div>

                                {topicList.map(topic => (
                                    <div className={styles.forumsDataRow} key={topic._id}>
                                        <div className={`${styles.forumsDataItem} ${styles.forumsDataItem1}`}>
                                            <p className={styles.forumsName}>
                                                <Link href={`/forum/${forumId}/topic/${topic._id}`} passHref>
                                                    <strong>{topic.title}</strong>
                                                </Link>
                                            </p>
                                            <p className={styles.forumsDescription}><small>by:</small> {topic.username}</p>
                                            <p className={styles.forumsDescription}>{topic.lastDate}</p>
                                        </div>
                                        <div className={`${styles.forumsDataItem} ${styles.forumsDataItem2a}`}>{topic.replies.length}</div>

                                        <div className={`${styles.forumsDataItem} ${styles.forumsDataItem3a}`}>{topic.views}</div>
                                        <div className={`${styles.forumsDataItem} ${styles.forumsDataItem4}`}>
                                            {topic.lastReply &&
                                                <>
                                                    <p>
                                                        <Link href={`/forum/${forumId}/topic/${topic._id}${topic.lastReply.replyId ? `?reply=${topic.lastReply.replyId}` : ''}`}>
                                                            {topic.lastReply.subject}
                                                        </Link>
                                                    </p>
                                                    {topic.lastReply.username && <p className={styles.forumsDescription}><small>by:</small> {topic.lastReply.username}</p>}
                                                    <p className={styles.forumsDescription}>{topic.lastReply.lastDate}</p>
                                                </>
                                            }
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    }
                </article>
            </>
        );
    }

    return null;
}
