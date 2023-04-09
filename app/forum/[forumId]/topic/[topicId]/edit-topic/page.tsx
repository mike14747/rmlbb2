import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { getActiveForumTopic } from '@/lib/api/forum';
import { Suspense } from 'react';
import Spinner from '@/components/Spinner';
// import Link from 'next/link';
import EditTopicForm from '@/components/Forum/EditTopicForm';

import styles from '@/styles/forum.module.css';

export const metadata: Metadata = {
    title: 'RML Baseball - Edit Topic',
};

type EditTopicParams = {
    params: {
        forumId: string;
        topicId: string;
    }
}

export default async function EditTopicPage({ params }: EditTopicParams) {
    const { forumId, topicId } = params;

    const session = await getServerSession({
        callbacks: { session: ({ token }) => token },
    });

    if (!session) {
        redirect(`/login?callbackUrl=/forum/${forumId}/topic/${topicId}/edit-topic`);
    }

    const topicData = await getActiveForumTopic(parseInt(forumId), parseInt(topicId));

    return (
        <main id="main">
            <article className={styles.forumPageWrapper}>
                <h2 className="page-heading">
                    Edit Post
                </h2>

                <Suspense fallback={<Spinner size="large" />}>
                    {topicData
                        ? <EditTopicForm topicData={topicData} />
                        : <p>An error occurred fetching topic data.</p>
                    }
                </Suspense>
            </article>
        </main>
    );
}
