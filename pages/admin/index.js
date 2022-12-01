import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';

import styles from '../../styles/admin.module.css';

export default function AdminHome() {
    const { data: session, status } = useSession();
    const loading = status === 'loading';

    const router = useRouter();

    if (typeof window !== 'undefined' && loading) return null;

    if (!session || !session.user || !session.user.role || session.user.role !== 'admin') router.push('/');

    if (session && session?.user?.role === 'admin') {
        return (
            <>
                <Head>
                    <title>
                        RML Baseball - Admin
                    </title>
                </Head>

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
                            <Link href="/admin/add-forum">
                                Add new forum
                            </Link>
                        </li>

                        <li>
                            <Link href="/admin/edit-forum">
                                Edit forum
                            </Link>
                        </li>
                    </ul>
                </article>
            </>
        );
    }

    return null;
}
