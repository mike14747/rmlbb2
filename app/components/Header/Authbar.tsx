'use client';

import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import Button from '@/components/Button';

import styles from '@/styles/Authbar.module.css';

const Authbar = () => {
    const { data: session, status } = useSession();
    const loading = status === 'loading';

    return (
        <section className={'container ' + styles.authbarContainer}>
            {loading && <>Loading...</>}

            {!session && !loading &&
                <Link href="/login?callbackUrl=/">
                    Login
                </Link>
            }

            {session?.user &&
                <>
                    <span className={styles.username}>
                        <>User: </>
                        <Link href="/profile">
                            {session.user.name}
                        </Link>
                    </span>

                    <Button onClick={() => signOut({ callbackUrl: '/' })} size="small" variant="text">Logout</Button>
                </>
            }
        </section>
    );
};

export default Authbar;
