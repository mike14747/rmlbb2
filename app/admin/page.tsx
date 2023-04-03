import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import Link from 'next/link';

import styles from '@/styles/admin.module.css';

export const revalidate = 600;

export const metadata: Metadata = {
    title: 'RML Baseball - Admin Home',
};

export default async function AdminHome() {
    const session = await getServerSession({
        callbacks: { session: ({ token }) => token },
    });

    if (!session) {
        redirect('/login?callbackUrl=/admin');
    }

    if (session.role === 'admin') {
        return (
            <article className={styles.adminContainer}>
                <h2 className={'page-heading ' + styles.adminPageHeading}>
                    Admin Home
                </h2>

                <ul>
                    <li>
                        <Link href="/admin/add-user">
                            Add new user
                        </Link>
                    </li>

                    <li>
                        <Link href="/admin/edit-user">
                            Edit a user
                        </Link>
                    </li>

                    <li>
                        <Link href="/admin/add-forum">
                            Add new forum
                        </Link>
                    </li>

                    <li>
                        <Link href="/admin/edit-forum">
                            Edit a forum
                        </Link>
                    </li>
                </ul>
            </article>
        );
    }

    return null;
}
