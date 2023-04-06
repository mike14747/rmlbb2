'use client';

import Link from 'next/link';
// import parse from 'html-react-parser';
// import DOMPurify from 'dompurify';

import styles from '@/styles/forum.module.css';

type TopicContentProps = {
    forumId: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    topicData: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    repliesData: any;
}

export default function TopicContent({ forumId, topicData, repliesData }: TopicContentProps) {
    console.log({ repliesData });
    return (
        <>
            <p className="small">
                <Link href="/forum">
                    Forum Index
                </Link>

                <span className={styles.arrow}> &#10139; </span>

                <Link href={`/forum/${forumId}`}>
                    {topicData.forumName}
                </Link>

                <span className={styles.arrow}> &#10139; {topicData.title}</span>
            </p>

            <h2 className={'page-heading ' + styles.forumPageHeading}>
                {topicData.title}
            </h2>

            <p className="small">
                <>&#128221; </>
                <Link href={`/forum/${forumId}/topic/new-topic`} passHref>
                    <strong>Reply to Topic</strong>
                </Link>
            </p>

            <div className={styles.topicContainer}>
                <div className={styles.topicHeading}>
                    <p className={styles.topicTitle}>
                        {topicData.title}
                    </p>

                    <p className={styles.topicDetails}>
                        by: {topicData.username} &#10139; <span className={styles.topicDate}>{topicData.dateStr}</span>
                    </p>
                </div>

                <div className={styles.topicBody}>
                    {/* {parse(DOMPurify.sanitize(topicData.content))} */}
                </div>
            </div>

            {/* {repliesData?.length > 0 &&
                repliesData.map(reply => (
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
    );
}
