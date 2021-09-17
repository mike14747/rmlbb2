import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

import styles from '../styles/Authbar.module.css';

const Authbar = () => {
    const { data: session, status } = useSession();
    const loading = status === 'loading';

    return (
        <div className={'container ' + styles.authbarContainer}>
            {!session && !loading &&
                <>
                    <span className={styles.linkArrows}>
                        <Link href="/auth/signin">
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <a>
                                Sign in
                            </a>
                        </Link>
                    </span>
                </>
            }

            {session &&
                <>
                    User: <strong className={styles.username}>
                        <Link href="/profile">
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <a>
                                {session.user.name}
                            </a>
                        </Link>
                    </strong>

                    <span className={styles.linkArrows}></span>
                    <button onClick={() => signOut({ redirect: false })} className={styles.signout}>
                        Sign out
                    </button>
                </>
            }
        </div>
    );
};

export default Authbar;
