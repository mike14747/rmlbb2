import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import NewTopicForm from '@/components/Forum/NewTopicForm';
import { getForumName } from '@/lib/api/forum';
import { Suspense } from 'react';
import Spinner from '@/components/Spinner';

import styles from '@/styles/forum.module.css';

export const metadata: Metadata = {
    title: 'RML Baseball - New Topic',
};

type NewTopicParams = {
    params: {
        forumId: string;
    }
}

export default async function NewTopicPage({ params }: NewTopicParams) {
    const session = await getServerSession({
        callbacks: { session: ({ token }) => token },
    });

    const { forumId } = params;

    if (!session) {
        redirect('/login?callbackUrl=/forum/' + forumId + '/topic/new-topic');
    }

    const forumData = await getForumName(parseInt(forumId));

    return (
        <main id="main">
            <article className={styles.forumPageWrapper}>
                <h1 className={'page-heading ' + styles.forumPageHeading}>
                    New Topic
                </h1>

                <Suspense fallback={<Spinner />}>
                    {forumData
                        ? <NewTopicForm userId={session.id} username={session.name} forumId={forumData._id} forumName={forumData.name} />
                        : <p className="error">An error occurred fetching forum data.</p>
                    }
                </Suspense>
            </article>
        </main>
    );
}
