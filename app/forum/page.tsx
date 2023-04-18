import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { getForumList } from '@/lib/api/forum';
import { Suspense } from 'react';
import Spinner from '@/components/Spinner';
import Link from 'next/link';
import ParagraphRound from '@/assets/paragraphRound.svg';

import styles from '@/styles/forum.module.css';

export const metadata: Metadata = {
    title: 'RML Baseball - Message Forum',
};

export default async function ForumHome() {
    const session = await getServerSession({
        callbacks: { session: ({ token }) => token },
    });

    console.log({ session });

    // npm i next@latest react@latest react-dom@latest eslint-config-next@latest

    if (!session) {
        redirect('/login?callbackUrl=/forum');
    }

    const forumList = await getForumList();

    if (!forumList) return <p className="error">An error occurred fetching the forums.</p>;

    return (
        <main id="main">
            <article className={styles.forumPageWrapper}>
                <h2 className={'page-heading ' + styles.forumPageHeading}>
                    Forum Index
                </h2>

                <Suspense fallback={<Spinner size="large" />}>
                    {forumList?.length > 0 &&
                        <div className={styles.forumsContainer}>
                            <div className={styles.forumsHeadingRow}>
                                <div className={`${styles.forumsHeadingItem} ${styles.forumsHeadingItem1}`}>Forum</div>
                                <div className={`${styles.forumsHeadingItem} ${styles.forumsHeadingItem2}`}>Topics</div>
                                <div className={`${styles.forumsHeadingItem} ${styles.forumsHeadingItem3}`}>Posts</div>
                                <div className={`${styles.forumsHeadingItem} ${styles.forumsHeadingItem4}`}>Last Post</div>
                            </div>

                            {forumList.map(forum => (
                                <div className={styles.forumsDataRow} key={forum._id}>
                                    <div className={`${styles.forumsDataItem} ${styles.forumsTitle} ${styles.forumsDataItem1}`}>
                                        <div>
                                            {forum.lastPostDaysAgo && <ParagraphRound aria-hidden="true" className={`${styles.messageIcon} ${forum.lastPostDaysAgo < 14 ? styles.new : forum.lastPostDaysAgo < 60 ? styles.med : styles.old}`} />}
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
                                                <p className='small'><small>by:</small> {forum.lastPost.username}</p>
                                                <p><small>{forum.lastPost.dateStr}</small></p>
                                            </>
                                        }

                                    </div>
                                </div>
                            ))}
                        </div>
                    }
                </Suspense>
            </article>
        </main>
    );
}
