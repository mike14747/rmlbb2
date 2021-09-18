import { useState } from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import SignInInline from './SignInInline';

import styles from '../styles/Authbar.module.css';

const Authbar = () => {
    const { data: session, status } = useSession();
    const loading = status === 'loading';
    const [showSignin, setShowSignin] = useState(false);

    return (
        <div className={'container ' + styles.authbarContainer}>
            {loading && <>Loading...</>}

            {!session && !loading &&
                <>
                    {showSignin
                        ? <SignInInline showSignin={showSignin} />
                        : <>
                            <span className={styles.linkArrows}></span>
                            <button onClick={() => setShowSignin(true)} className={styles.showSignin}>
                                Sign in
                            </button>
                        </>
                    }
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
