import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Loading from '../components/Loading';
import SignIn from '../components/SignIn';

// import styles from '../styles/directory.module.css';

const Directory = () => {
    const { data: session, status } = useSession();
    const loading = status === 'loading';
    const [showSignin, setShowSignin] = useState(false);

    useEffect(() => {
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

                <SignIn showSignin={showSignin} />

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
