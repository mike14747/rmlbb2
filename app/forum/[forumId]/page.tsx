import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { getActiveForumTopics } from '@/lib/api/forum';
import { Suspense } from 'react';
import Spinner from '@/components/Spinner';
import Link from 'next/link';

import styles from '@/styles/forum.module.css';

export const metadata: Metadata = {
    title: 'RML Baseball - Message Forum',
};

export default async function Forum({ params }: { params: Promise<{ forumId: string }> }) {
    const session = await getServerSession({
        callbacks: { session: ({ token }) => token },
    });

    if (!session) {
        redirect('/login?callbackUrl=/forum');
    }

    const { forumId } = await params;

    const forumTopics = await getActiveForumTopics(parseInt(forumId));

    if (!forumTopics) return <p className="error">An error occurred fetching forum topics.</p>;

    return (
        <main id="main">
            <article className={styles.forumPageWrapper}>
                <Suspense fallback={<Spinner size="large" />}>
                    {forumTopics?.length > 0 &&
                        <>
                            <p className="small">
                                <Link href="/forum">
                                    Forum Index
                                </Link>
                                <span className={styles.arrow}> &#10139; {forumTopics[0].forumName}</span>
                            </p>

                            <h1 className={'page-heading ' + styles.forumPageHeading}>
                                {forumTopics[0].forumName}
                            </h1>

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

                                {forumTopics.map(topic => (
                                    <div className={styles.forumsDataRow} key={topic._id}>
                                        <div className={`${styles.forumsDataItem} ${styles.forumsDataItem1}`}>
                                            <p className={styles.forumsName}>
                                                <Link href={`/forum/${forumId}/topic/${topic._id}`} passHref>
                                                    <strong>{topic.title}</strong>
                                                </Link>
                                            </p>
                                            <p className={styles.forumsDescription}><small>by:</small> {topic.username}</p>
                                            <p className={styles.forumsDescription}>{topic.dateStr}</p>
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
                                                    <p className={styles.forumsDescription}>{topic.lastReply.dateStr}</p>
                                                </>
                                            }
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    }
                </Suspense>
            </article>
        </main>
    );
}
