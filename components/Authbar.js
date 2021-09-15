import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/client';
import SignInOutButton from './SignInOutButton';

import styles from '../styles/Authbar.module.css';

const Authbar = () => {
    const [session, loading] = useSession();
    console.log('Session (in Auth.js):', session);

    return (
        <div className={'container ' + styles.authbarContainer}>
            {!session && !loading &&
                <>
                    <SignInOutButton func={signIn} text={'Sign in'} />
                </>
            }

            {session &&
                <>
                    User: <strong className={styles.username}>{session.user.name}</strong>

                    <SignInOutButton func={signOut} text={'Sign out'} />
                </>
            }
        </div>
    );
};

export default Authbar;
