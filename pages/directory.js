import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/client';
import Head from 'next/head';
import Loading from '../components/Loading';
import Signin from '../components/Signin';

// import styles from '../styles/directory.module.css';

const Directory = () => {
    const [session, loading] = useSession();
    const [showSignin, setShowSignin] = useState(false);

    useEffect(() => {
        console.log('session inside useEffect in directory page:', session);

        return !session ? setShowSignin(true) : setShowSignin(false);
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

                <Signin showSignin={showSignin} />

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
