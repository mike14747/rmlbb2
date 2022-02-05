import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import Loading from '../../components/Loading';

import styles from '../../styles/forum.module.css';

export default function ForumHome() {
    const { data: session, status } = useSession();
    const loading = status === 'loading';

    const router = useRouter();

    const [forums, setForums] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();

        if (session) {
            setIsLoading(true);

            fetch('/api/forum', { signal: abortController.signal })
                .then(res => res.json())
                .then(data => {
                    setForums(data);
                    setError(null);
                })
                .catch(error => {
                    if (error.name === 'AbortError') {
                        console.error('Data fetching was aborted!');
                    } else {
                        console.error(error);
                        setForums(null);
                        setError('An error occurred fetching data.');
                    }
                })
                .finally(() => setIsLoading(false));
        }

        return () => abortController.abort();
    }, [session]);

    if (typeof window !== 'undefined' && loading) return null;

    if (!session) {
        router.push('/login?url=/forum');
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
                    Message Forum
                </h2>

                {error && <p className="error">{error}</p>}

                {isLoading && <Loading />}

                <div className={styles.forumsContainer}>
                    <div className={styles.forumsHeadingRow}>
                        <div className={styles.forumsHeadingItem}>Forum</div>
                        <div className={`text-center ${styles.forumsHeadingItem}`}>Topics</div>
                        <div className={`text-center ${styles.forumsHeadingItem}`}>Posts</div>
                        <div className={styles.forumsHeadingItem}>Last Post</div>
                    </div>

                    {forums?.length > 0 &&
                        forums.map(forum => (
                            <div className={styles.forumsDataRow} key={forum._id}>
                                <div className={`${styles.forumsDataItem} ${styles.forumsTitle}`}>
                                    <div className={styles.iconContainer}>
                                        {/* <span aria-hidden="true">&#128240;</span> */}
                                        {/* <img aria-hidden="true" src="/images/message_icon2.png" alt="Forum" className={styles.messageIcon} /> */}
                                        <img aria-hidden="true" src="/images/postIcon.svg" alt="Forum" className={styles.messageIcon} />
                                    </div>

                                    <div>
                                        <p className={styles.forumsName}>
                                            <Link href={`/forum/${forum._id}`}>
                                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                                <a><strong>{forum.name}</strong></a>
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                                <div className={`text-center ${styles.forumsDataItem}`}>{forum.topics}</div>
                                <div className={`text-center ${styles.forumsDataItem}`}>{forum.posts}</div>
                                <div className={styles.forumsDataItem}>
                                    {forum.lastPost &&
                                        <>
                                            <p>
                                                <Link href={`/forum/topic/${forum.lastPost.topicId}${forum.lastPost.postId ? `?reply=${forum.lastPost.postId}` : ''}`}>
                                                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                                    <a><strong>{forum.lastPost.subject}</strong></a>
                                                </Link>
                                            </p>
                                            {forum.lastPost.username && <p className='small'><small>by:</small> {forum.lastPost.username}</p>}
                                            <p>{forum.lastPost.date}</p>
                                        </>
                                    }

                                </div>
                            </div>
                        ))
                    }
                </div>
            </article>
        </>
    );
}
