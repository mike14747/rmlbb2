import Head from 'next/head';
import React from 'react';
// import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/client';

// import styles from '../styles/directory.module.css';

const Directory = () => {
    const [session, loading] = useSession();
    // console.log('Session (in directory.js):', session);

    return (
        <>
            <Head>
                <title>
                    RML Baseball - Directory
                </title>
            </Head>

            <article>
                <h2 className="page-heading">
                    Directory
                </h2>
                {!session &&
                    <>
                        <p>You are NOT signed in.</p>
                        <p>You are NOT allowed to view the secret contents of this page.</p>
                    </>
                }

                {session &&
                    <>
                        <p>You are signed in.</p>
                        <p>Welcome to the secret contents of this page.</p>
                    </>
                }
            </article>
        </>
    );
};

export default Directory;
