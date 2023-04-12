import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { getForumListForEdit } from '@/lib/api/forum';
import { Suspense } from 'react';
import Spinner from '@/components/Spinner';
import EditForumList from '@/components/Admin/EditForumList';

import styles from '@/styles/admin.module.css';

export const metadata: Metadata = {
    title: 'RML Baseball - Edit Forum',
};

export default async function EditForumPage() {
    const session = await getServerSession({
        callbacks: { session: ({ token }) => token },
    });

    if (!session) {
        redirect('/login?callbackUrl=/admin');
    }

    if (session.role === 'admin') {
        const forumList = await getForumListForEdit();

        return (
            <article className={styles.adminContainer}>
                <h2 className={'page-heading ' + styles.adminPageHeading}>
                    Edit Forum
                </h2>

                <Suspense fallback={<Spinner size="large" />}>
                    {forumList
                        ? <EditForumList forumList={forumList} />
                        : <p className="error">An error occurred fetching forum list.</p>
                    }
                </Suspense>
            </article>
        );
    }

    return null;
}
