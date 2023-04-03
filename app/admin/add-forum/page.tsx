import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import AddForum from '../../components/Admin/AddForum';

import styles from '../../../styles/admin.module.css';

export const metadata: Metadata = {
    title: 'RML Baseball - Add Forum',
};

export default async function AddForumPage() {
    const session = await getServerSession({
        callbacks: { session: ({ token }) => token },
    });

    if (!session) {
        redirect('/login?callbackUrl=/admin/add-forum');
    }

    if (session.role === 'admin') {
        return (
            <article className={styles.adminContainer}>
                <h2 className={'page-heading ' + styles.adminPageHeading}>
                    Add Forum
                </h2>

                <AddForum />
            </article>
        );
    }

    return null;
}
