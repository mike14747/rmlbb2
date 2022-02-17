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
                    console.log('data:', data);
                    setTopicList(data);
                    setError(null);
                    setIsLoading(false);
                })
                .catch(error => {
                    if (error.name === 'AbortError') {
                        console.log('Data fetching was aborted!');
                    } else {
                        console.log(error);
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
        router.push(`/login?url=/forum/${forumId}`);
    }

    return (
        <>
            <Head>
                <title>
                    RML Baseball - Forum
                </title>
            </Head>

            <article>
                {error && <p className="error">{error}</p>}

                {isLoading && <Loading />}

                {!isLoading && (!topicList || topicList.length === 0) &&
                    <p className="error">An error occurred. Could not find the selected forum.</p>
                }

                {topicList?.length > 0 &&
                    <>
                        <p>
                            <Link href="/forum">
                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                <a>
                                    Forum Index
                                </a>
                            </Link>
                            <> &#10139; </>
                            <Link href={`/forum/${forumId}`}>
                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                <a>
                                    {topicList[0].forumName}
                                </a>
                            </Link>
                        </p>

                        <h2 className={'page-heading ' + styles.forumPageHeadding}>
                            {topicList[0].forumName}
                        </h2>

                        <div className={styles.forumsContainer}>
                            <div className={styles.forumsHeadingRow}>
                                <div className={styles.forumsHeadingItem}>Topic</div>
                                <div className={`text-center ${styles.forumsHeadingItem}`}>Replies</div>
                                <div className={`text-center ${styles.forumsHeadingItem}`}>Views</div>
                                <div className={styles.forumsHeadingItem}>Last Reply</div>
                            </div>

                            {topicList.map(topic => (
                                <div className={styles.forumsDataRow} key={topic._id}>
                                    <div className={`${styles.forumsDataItem} ${styles.forumsIcon}`}>
                                        {/* <div>
                                        <img aria-hidden="true" src="/images/message_icon2.png" alt="Forum" className={styles.messageIcon} />
                                    </div> */}

                                        <div>
                                            <p className={styles.forumsName}>
                                                <Link href={`/forum/${forumId}/topic/${topic._id}`}>
                                                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                                    <a><strong>{topic.title}</strong></a>
                                                </Link>
                                            </p>
                                            <p className={styles.forumsDescription}>by {topic.username}<span className="break"></span><span className={styles.on}>{topic.date}</span></p>
                                        </div>
                                    </div>
                                    <div className={`text-center ${styles.forumsDataItem}`}>{topic.replies.length}</div>

                                    <div className={`text-center ${styles.forumsDataItem}`}>{topic.views}</div>
                                    <div className={styles.forumsDataItem}>
                                        {topic.lastReply &&
                                            <>
                                                <p>
                                                    <Link href={`/forum/${forumId}/topic/${topic._id}${topic.lastReply.replyId ? `?reply=${topic.lastReply.replyId}` : ''}`}>
                                                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                                        <a><strong>{topic.lastReply.subject}</strong></a>
                                                    </Link>
                                                </p>
                                                {topic.lastReply.username && <p className='small'><small>by:</small> {topic.lastReply.username}</p>}
                                                <p>{topic.lastReply.date}</p>
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
