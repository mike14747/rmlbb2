import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { getForumTopic, getTopicReplies } from '@/lib/api/forum';
import { Suspense } from 'react';
import Spinner from '@/components/Spinner';
import TopicContent from '@/components/Forum/TopicContent';

import styles from '@/styles/forum.module.css';

export const metadata: Metadata = {
    title: 'RML Baseball - Page Title',
};

type TopicParams = {
    params: {
        forumId: string;
        topicId: string;
    }
}

export default async function Topic({ params }: TopicParams) {
    console.log({ params });
    const session = await getServerSession({
        callbacks: { session: ({ token }) => token },
    });

    if (!session) {
        redirect('/login?callbackUrl=/protected-page');
    }

    const { forumId, topicId } = params;
    const page = '1';

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function setRepliesArr(page: number, arr: any) {
        let repliesStartIndex = 0;
        let repliesEndIndex = 24;
        if (page && page >= 2) {
            repliesStartIndex = (page - 1) * 24;
            repliesEndIndex = 25 + ((page - 1) * 24);
        }
        const newRepliesArr = arr.slice(repliesStartIndex, repliesEndIndex);
        return newRepliesArr;
    }

    const topicData = await getForumTopic(parseInt(forumId), parseInt(topicId));
    const repliesData = await getTopicReplies(setRepliesArr(parseInt(page), topicData?.replies));

    if (!topicData || !repliesData) return <p className="error">An error occurred fetching topic data.</p>;

    return (
        <main id="main">
            <article className={styles.forumPageWrapper}>
                <Suspense fallback={<Spinner size="large" />}>
                    <TopicContent forumId={forumId} topicData={topicData} repliesData={''} />
                </Suspense>
            </article>
        </main>
    );
}
