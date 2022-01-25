import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';

import styles from '../../styles/forum.module.css';

export default function Forum() {
    const { data: session, status } = useSession();
    const loading = status === 'loading';

    const router = useRouter();
    const forumId = router.query.forumid;

    const [topicList, setTopicList] = useState(null);

    useEffect(() => {
        if (session) {
            setTopicList([
                {
                    _id: '1234',
                    subject: 'This is topic 1',
                    username: 'Highlanders',
                    dateTime: 'Decemeber 12, 2021 10:40pm',
                    replies: 12,
                    views: 23,
                    lastPost: {
                        username: 'Twins',
                        dateTime: 'January 3, 2022 2:23pm',
                    },
                },
            ]);
        }
    }, [session]);

    if (typeof window !== 'undefined' && loading) return null;

    if (!session) {
        router.push(`/login?url=/forum/${forumId}`);
        // router.push(`/login?url=/forum/${forumId}`, '/login');
        // router.push({
        //     pathname: '/login',
        //     query: { url: `/forum/${forumId}`, forumname: 'Test Forum' },
        // }, '/login');
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

                {/* <p>
                    You have selected a forum (id: {forumId}) and reached that forum&apos;s page.
                </p> */}

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
                                            <Link href={`/forum/topic/${topic._id}`}>
                                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                                <a><strong>{topic.subject}</strong></a>
                                            </Link>
                                        </p>
                                        <p className={styles.forumsDescription}>by {topic.username}<span className="break"></span><span className={styles.on}>{topic.lastPost.dateTime}</span></p>
                                    </div>
                                </div>
                                <div className={`text-center ${styles.forumsDataItem}`}>{topic.replies}</div>
                                <div className={`text-center ${styles.forumsDataItem}`}>{topic.views}</div>
                                <div className={styles.forumsDataItem}>
                                    <p>by {topic.lastPost.username}</p>
                                    <p>{topic.lastPost.dateTime}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </article>
        </>
    );
}
