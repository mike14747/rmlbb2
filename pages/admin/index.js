import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';

// import styles from '../styles/admin.module.css';

export default function AdminHome() {
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
                    Admin Home
                </h2>

                <ul>
                    <li>
                        <Link href="/admin/add-user">
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <a>Add new user</a>
                        </Link>
                    </li>

                    <li>
                        <Link href="/admin/edit-user">
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <a>Edit user</a>
                        </Link>
                    </li>

                    <li>
                        <Link href="/admin/add-forum">
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <a>Add new forum</a>
                        </Link>
                    </li>

                    <li>
                        <Link href="/admin/edit-forum">
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <a>Edit forum</a>
                        </Link>
                    </li>
                </ul>
            </article>
        </>
    );
}
