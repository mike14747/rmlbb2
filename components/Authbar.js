import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import SignInMini from './SignInMini';

import styles from '../styles/Authbar.module.css';

const Authbar = () => {
    const { data: session, status } = useSession();
    const loading = status === 'loading';

    return (
        <div className={'container ' + styles.authbarContainer}>
            {loading && <>Loading...</>}

            {!session && !loading &&
                <>
                    <SignInMini />
                </>
            }

            {session &&
                <>
                    User: <span className={styles.username}>
                        <Link href="/profile">
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <a>
                                {session.user.name}
                            </a>
                        </Link>
                    </span>

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
