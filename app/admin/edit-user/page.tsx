import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
// import Link from 'next/link';

import styles from '@/styles/admin.module.css';

export const metadata: Metadata = {
    title: 'RML Baseball - Edit User',
};

export default async function EditUserPage() {
    const session = await getServerSession({
        callbacks: { session: ({ token }) => token },
    });

    if (!session) {
        redirect('/login?callbackUrl=/admin/edit-user');
    }

    if (session.role === 'admin') {
        return (
            <article className={styles.adminContainer}>
                <h2 className={'page-heading ' + styles.adminPageHeading}>
                    Edit User
                </h2>

                <p>This is the unfinished edit user page.</p>

                <p>You are seeing this page because you are logged in with the role of admin.</p>
            </article>
        );
    }

    return null;
}
