import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import AddUserForm from '@/components/Admin/AddUserForm';

import styles from '@/styles/admin.module.css';

export const metadata: Metadata = {
    title: 'RML Baseball - Add User',
};

export default async function AddUser() {
    const session = await getServerSession({
        callbacks: { session: ({ token }) => token },
    });

    if (!session) {
        redirect('/login?callbackUrl=/admin');
    }

    if (session.role === 'admin') {
        return (
            <main id="main">
                <article className={styles.adminContainer}>
                    <h1 className={'page-heading ' + styles.adminPageHeading}>
                        Add User
                    </h1>

                    <AddUserForm />
                </article>
            </main>
        );
    }

    return null;
}
