import Head from 'next/head';
import { signIn, useSession } from 'next-auth/client';
import Loading from '../components/Loading';
import SignInOutButton from '../components/SignInOutButton';

import styles from '../styles/profile.module.css';

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
                    <SignInOutButton func={signIn} text={'Sign in'} />
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
