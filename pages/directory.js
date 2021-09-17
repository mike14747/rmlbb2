import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/client';
import Loading from '../components/Loading';
import Signin from '../components/Signin';

// import styles from '../styles/directory.module.css';

const Directory = () => {
    const [session, loading] = useSession();
    const [showLogin, setShowLogin] = useState(false);

    useEffect(() => {
        console.log('session inside useEffect in directory page:', session);

        return !session ? setShowLogin(true) : setShowLogin(false);
    }, [session]);

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

                        {showLogin && <Signin />}
                    </>
                }

                {session &&
                    <>
                        <p>You are signed in {session.user.name}.</p>

                        <p>Manager directory will be here.</p>
                    </>
                }
            </article>
        </>
    );
};

export default Directory;
