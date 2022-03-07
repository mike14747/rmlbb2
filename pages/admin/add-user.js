import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Head from 'next/head';

import styles from '../../styles/admin.module.css';

export default function AddUser() {
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
                        Add User
                    </h2>
                </article>
            </>
        );
    }

    return null;
}
