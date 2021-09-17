import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/client';
import Head from 'next/head';
import Loading from '../components/Loading';
import Signin from '../components/Signin';

// import styles from '../styles/profile.module.css';

const Profile = () => {
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
                    Profile
                </title>
            </Head>

            <h2 className="page-heading">
                Profile
            </h2>

            {loading && <Loading />}

            <Signin showSignin={showSignin} />

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
