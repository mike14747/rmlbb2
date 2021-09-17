import Head from 'next/head';
import { useSession } from 'next-auth/client';
import Loading from '../components/Loading';
import Signin from '../components/Signin';

// import styles from '../styles/directory.module.css';

const Directory = () => {
    const [session, loading] = useSession();

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

                        <Signin />
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
