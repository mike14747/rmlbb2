import React from 'react';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/client';
import SignInOutButton from './SignInOutButton';

import styles from '../styles/Authbar.module.css';

const Authbar = () => {
    const [session, loading] = useSession();

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

                    <SignInOutButton func={() => signOut({ redirect: false, callbackUrl: '/' })} text={'Sign out'} />
                </>
            }
        </div>
    );
};

export default Authbar;