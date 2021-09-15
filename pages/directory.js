import Head from 'next/head';
import React from 'react';
// import Link from 'next/link';
import { signIn, useSession } from 'next-auth/client';
import Loading from '../components/Loading';
import SignInOutButton from '../components/SignInOutButton';

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

                {loading && <Loading />}

                {!session && !loading &&
                    <>
                        <p>You must be signed in to view this page.</p>
                        <SignInOutButton func={signIn} text={'Sign in'}/>
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
