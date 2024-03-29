import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import AddForumForm from '@/components/Admin/AddForumForm';

import styles from '@/styles/admin.module.css';

export const metadata: Metadata = {
    title: 'RML Baseball - Add Forum',
};

export default async function AddForum() {
    const session = await getServerSession({
        callbacks: { session: ({ token }) => token },
    });

    if (!session) {
        redirect('/login?callbackUrl=/admin/add-forum');
    }

    if (session.role === 'admin') {
        return (
            <main id="main">
                <article className={styles.adminContainer}>
                    <h1 className={'page-heading ' + styles.adminPageHeading}>
                        Add Forum
                    </h1>

                    <AddForumForm />
                </article>
            </main>
        );
    }

    return null;
}
