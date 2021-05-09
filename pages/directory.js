import Head from 'next/head';
import React from 'react';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/client';

import styles from '../styles/Directory.module.css';

const Directory = () => {
    const [session, loading] = useSession();
    console.log('Session (in directory.js):', session);

    return (
        <>
            <Head>
                <title>
                    RML Baseball - Manager Directory
                </title>
            </Head>
            <h2 className="pageHeading">
                Manager Directory
            </h2>
            {!session &&
                <>
                    <div>You are not signed in.</div>
                    <button onClick={signIn}>Sign in</button>
                </>
            }

            {session &&
                <>
                    <div>Signed in as: {session.user.username}</div>
                    <button onClick={signOut}>Sign out</button>
                </>
            }
        </>
    );
};

export default Directory;
