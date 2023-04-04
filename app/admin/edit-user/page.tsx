import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { getAllUsers } from '@/lib/api/user';
import { Suspense } from 'react';
import EditUser from '@/components/Admin/EditUser';
import Spinner from '@/components/Spinner';

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

    const usersData = await getAllUsers();

    if (session.role === 'admin') {
        return (
            <article className={styles.adminContainer}>
                <h2 className={'page-heading ' + styles.adminPageHeading}>
                    Edit User
                </h2>

                <Suspense fallback={<Spinner size="large" />}>
                    <EditUser usersData={usersData} />
                </Suspense>
            </article>
        );
    }

    return null;
}