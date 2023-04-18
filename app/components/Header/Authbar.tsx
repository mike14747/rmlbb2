'use client';

import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import Button from '@/components/Button';

import styles from '@/styles/Authbar.module.css';

function Authbar() {
    const { data: session, status } = useSession();
    const loading = status === 'loading';

    return (
        <section className={'container ' + styles.authbarContainer}>
            {loading && <span className={styles.username}>Loading...</span>}

            {!session && !loading &&
                <>
                    <span className={styles.username}>
                        <Link href="/login?callbackUrl=/">
                            Login
                        </Link>
                    </span>
                </>
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
}

export default Authbar;
