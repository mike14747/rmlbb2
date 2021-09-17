import Head from 'next/head';
import { useSession } from 'next-auth/client';
import Loading from '../components/Loading';
import Signin from '../components/Signin';

// import styles from '../styles/profile.module.css';

const Profile = () => {
    const [session, loading] = useSession();

    return (
        <>
            <Head>
                <title>
                    Profile
                </title>
            </Head>

            <h2 className="page-heading">
                Profile
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

                    <p>This is where you will be able to change your username, email or password.</p>
                </>
            }
        </>
    );
};

export default Profile;
