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
                <h2 className={'page-heading ' + styles.forumPageHeadding}>
                    <small className={styles.forumText}>Forum: </small>Forum Name
                </h2>

                {error && <p className="error">{error}</p>}

                {isLoading && <Loading />}

                <div className={styles.forumsContainer}>
                    <div className={styles.forumsHeadingRow}>
                        <div className={styles.forumsHeadingItem}>Topic</div>
                        <div className={`text-center ${styles.forumsHeadingItem}`}>Replies</div>
                        <div className={`text-center ${styles.forumsHeadingItem}`}>Views</div>
                        <div className={styles.forumsHeadingItem}>Last Post</div>
                    </div>

                    {topicList?.length > 0 &&
                        topicList.map(topic => (
                            <div className={styles.forumsDataRow} key={topic._id}>
                                <div className={`${styles.forumsDataItem} ${styles.forumsIcon}`}>
                                    <div>
                                        {/* <span aria-hidden="true">&#128240;</span> */}
                                        <img aria-hidden="true" src="/images/message_icon2.png" alt="Forum" className={styles.messageIcon} />
                                    </div>

                                    <div>
                                        <p className={styles.forumsName}>
                                            <Link href={`/forum/${forumId}/topic/${topic._id}`}>
                                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                                <a><strong>{topic.title}</strong></a>
                                            </Link>
                                        </p>
                                        <p className={styles.forumsDescription}>by {topic.user_id}<span className="break"></span><span className={styles.on}>{topic.date}</span></p>
                                    </div>
                                </div>
                                <div className={`text-center ${styles.forumsDataItem}`}>10</div>

                                <div className={`text-center ${styles.forumsDataItem}`}>{topic.views}</div>
                                <div className={styles.forumsDataItem}>
                                    <p>by {topic.user_id}</p>
                                    <p>{topic.date}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>

            </article>
        </>
    );
}
