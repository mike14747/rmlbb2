'use client';

import Link from 'next/link';
import parse from 'html-react-parser';
import sanitizeHtml from 'sanitize-html';
import { ForumTopicToClient, TopicReplyData } from '@/types/forum-types';

import styles from '@/styles/forum.module.css';

type TopicContentProps = {
    topicData: ForumTopicToClient;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    repliesData: TopicReplyData[];
}

export default function TopicContent({ topicData, repliesData }: TopicContentProps) {
    return (
        <>
            <p className="small">
                <Link href="/forum">
                    Forum Index
                </Link>

                <span className={styles.arrow}> &#10139; </span>

                <Link href={`/forum/${topicData.forum_id}`}>
                    {topicData.forumName}
                </Link>

                <span className={styles.arrow}> &#10139; {topicData.title}</span>
            </p>

            <h2 className={'page-heading ' + styles.forumPageHeading}>
                {topicData.title}
            </h2>

            <p className="small">
                <>&#128221; </>
                <Link href={`/forum/${topicData.forum_id}/topic/new-topic`} passHref>
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
                    {parse(sanitizeHtml(topicData.content))}
                </div>
            </div>

            {repliesData?.length > 0 &&
                repliesData.map(reply => (
                    <div key={reply._id} className={styles.replyContainer}>
                        <div className={styles.replyHeading}>
                            <p className={styles.replyTitle}>
                                {reply.subject}
                            </p>

                            <p className={styles.replyDetails}>
                                by: {reply.username} &#10139; <span className={styles.replyDate}>{reply.dateStr}</span>
                            </p>
                        </div>

                        <div className={styles.replyBody}>
                            {parse(sanitizeHtml(reply.content))}
                        </div>
                    </div>
                ))
            }
        </>
    );
}
