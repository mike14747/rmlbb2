import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import Loading from '../../components/Loading';
import ParagraphRound from '../../assets/paragraphRound.svg';

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

    if (!session) router.push('/login?url=/forum');

    if (session) {
        return (
            <>
                <Head>
                    <title>
                        RML Baseball - Forum
                    </title>
                </Head>

                <article className={styles.forumPageWrapper}>
                    <h2 className={'page-heading ' + styles.forumPageHeading}>
                        Forum Index
                    </h2>

                    {error && <p className="error">{error}</p>}

                    {isLoading && <Loading />}

                    {forums?.length > 0 &&
                        <div className={styles.forumsContainer}>
                            <div className={styles.forumsHeadingRow}>
                                <div className={`${styles.forumsHeadingItem} ${styles.forumsHeadingItem1}`}>Forum</div>
                                <div className={`${styles.forumsHeadingItem} ${styles.forumsHeadingItem2}`}>Topics</div>
                                <div className={`${styles.forumsHeadingItem} ${styles.forumsHeadingItem3}`}>Posts</div>
                                <div className={`${styles.forumsHeadingItem} ${styles.forumsHeadingItem4}`}>Last Post</div>
                            </div>

                            {forums.map(forum => (
                                <div className={styles.forumsDataRow} key={forum._id}>
                                    <div className={`${styles.forumsDataItem} ${styles.forumsTitle} ${styles.forumsDataItem1}`}>
                                        <div>
                                            <ParagraphRound aria-hidden="true" className={`${styles.messageIcon} ${forum.lastPostDaysAgo < 14 ? styles.new : forum.lastPostDaysAgo < 60 ? styles.med : styles.old}`} />
                                        </div>

                                        <div>
                                            <p className={styles.forumsName}>
                                                <Link href={`/forum/${forum._id}`}>
                                                    {forum.name}
                                                </Link>
                                            </p>
                                        </div>
                                    </div>
                                    <div className={`${styles.forumsDataItem} ${styles.forumsDataItem2}`}>{forum.topics}</div>
                                    <div className={`${styles.forumsDataItem} ${styles.forumsDataItem3}`}>{forum.posts}</div>
                                    <div className={`${styles.forumsDataItem} ${styles.forumsDataItem4}`}>
                                        {forum.lastPost &&
                                            <>
                                                <p>
                                                    <Link href={`/forum/${forum._id}/topic/${forum.lastPost.topicId}${forum.lastPost.replyId ? `?reply=${forum.lastPost.replyId}` : ''}`}>
                                                        {forum.lastPost.subject}
                                                    </Link>
                                                </p>
                                                {forum.lastPost.username && <p className='small'><small>by:</small> {forum.lastPost.username}</p>}
                                                <p>{forum.lastPost.date}</p>
                                            </>
                                        }

                                    </div>
                                </div>
                            ))}
                        </div>
                    }
                </article>
            </>
        );

    }

    return null;
}
