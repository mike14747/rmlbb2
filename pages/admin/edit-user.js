import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Head from 'next/head';

// import styles from '../styles/admin.module.css';

export default function EditUser() {
    const { data: session, status } = useSession();
    const loading = status === 'loading';

    const router = useRouter();

    if (typeof window !== 'undefined' && loading) return null;

    if (!session || !session.user || !session.user.role || session.user.role !== 'admin') {
        router.push('/404');
    }

    return (
        <>
            <Head>
                <title>
                    RML Baseball - Admin
                </title>
            </Head>

            <article>
                <h2 className="page-heading">
                    Edit User
                </h2>
            </article>
        </>
    );
}
