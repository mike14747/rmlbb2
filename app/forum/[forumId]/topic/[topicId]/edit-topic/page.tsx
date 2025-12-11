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

export default async function EditTopicPage({ params }: { params: Promise<{ forumId: string, topicId: string }> }) {
    const { forumId, topicId } = await params;

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
                <h1 className="page-heading">
                    Edit Post
                </h1>

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
