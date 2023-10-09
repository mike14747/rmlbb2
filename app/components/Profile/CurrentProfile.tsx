'use client';

import { useState } from 'react';
import UpdateProfile from './UpdateProfile';
import { UserInfo } from '@/types/user-types';

import styles from '@/styles/profile.module.css';

export default function CurrentProfile({ userObj }: { userObj: UserInfo}) {
    const [user, setUser] = useState<UserInfo>(userObj);

    return (
        <>
            <div className={styles.currentContainer}>
                <div className={styles.currentHeading}>
                    <h2>Current profile information:</h2>
                </div>

                <p><span className={styles.description}>Username: </span>{user.username}</p>

                <p><span className={styles.description}>Password: </span>************</p>

                <p><span className={styles.description}>Email: </span>{user.email}</p>

                <p><span className={styles.description}>Posts: </span>{user.posts}</p>

                <p><span className={styles.description}>Registered Date: </span>{user.registeredDateStr || 'Not on record'}</p>
            </div>

            <UpdateProfile user={user} setUser={setUser} />
        </>
    );
}
