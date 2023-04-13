import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { getAllUsers } from '@/lib/api/user';
import { Suspense } from 'react';
import EditUserForm from '@/components/Admin/EditUserForm';
import Spinner from '@/components/Spinner';

import styles from '@/styles/admin.module.css';

export const metadata: Metadata = {
    title: 'RML Baseball - Edit User',
};

export default async function EditUser() {
    const session = await getServerSession({
        callbacks: { session: ({ token }) => token },
    });

    if (!session) {
        redirect('/login?callbackUrl=/admin/edit-user');
    }

    if (session.role === 'admin') {
        const usersData = await getAllUsers();

        return (
            <article className={styles.adminContainer}>
                <h2 className={'page-heading ' + styles.adminPageHeading}>
                    Edit User
                </h2>

                <Suspense fallback={<Spinner size="large" />}>
                    <EditUserForm usersData={usersData} />
                </Suspense>
            </article>
        );
    }

    return null;
}
