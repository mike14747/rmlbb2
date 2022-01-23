import PropTypes from 'prop-types';
import Head from 'next/head';
import Link from 'next/link';
import { getForumList } from '../../lib/api/forum';

import styles from '../../styles/forum.module.css';

export default function ForumHome({ forums }) {
    console.log('forums:', forums);
    return (
        <>
            <Head>
                <title>
                    RML Baseball - Forum
                </title>
            </Head>

            <article>
                <h2 className="page-heading">
                    Message Forum
                </h2>

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
                                <div className={`${styles.forumsDataItem} ${styles.forumsIcon}`}>
                                    <div>
                                        <span aria-hidden="true">&#128240;</span>
                                    </div>

                                    <div>
                                        <p className={styles.forumsName}>
                                            <Link href={`/forum/${forum._id}`}>
                                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                                <a><strong>{forum.name}</strong></a>
                                            </Link>
                                        </p>
                                        {/* <p className={styles.forumsDescription}>description</p> */}
                                    </div>
                                </div>
                                <div className={`text-center ${styles.forumsDataItem}`}>{forum.topics}</div>
                                <div className={`text-center ${styles.forumsDataItem}`}>{forum.posts}</div>
                                <div className={styles.forumsDataItem}>
                                    <p><strong>{forum.lastPost.topic}</strong></p>
                                    {forum.lastPost.username && <p>by {forum.lastPost.username}</p>}
                                    <p>{forum.lastPost.dateTime}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </article>
        </>
    );
}

ForumHome.propTypes = {
    forums: PropTypes.array,
};

export async function getStaticProps() {
    const forums = await getForumList();

    return {
        props: { forums },
        revalidate: 600, // page regeneration can occur in 10 minutes
    };
}
