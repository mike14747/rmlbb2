import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Loading from '../components/Loading';
import Signin from '../components/Signin';

// import styles from '../styles/profile.module.css';

const Profile = () => {
    const { data: session, status } = useSession();
    const loading = status === 'loading';
    const [showSignin, setShowSignin] = useState(false);
    const [user, setUser] = useState(null);
    const [isUserLoaded, setIsUserLoaded] = useState(false);

    useEffect(() => {
        console.log('session inside useEffect in directory page:', session);

        if (session) {
            setIsUserLoaded(false);
            fetch('/api/user/' + session.user.name)
                .then(res => res.json())
                .then(userArr => (userArr?.length === 1) ? setUser(userArr[0]) : setUser(null))
                .catch(error => console.log(error))
                .finally(() => setIsUserLoaded(true));
        } else {
            setUser(null);
            setIsUserLoaded(false);
        }

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
                    <p>You are signed in. Here is your current profile information.</p>

                    {!isUserLoaded && <Loading />}

                    {user && isUserLoaded &&
                        <>
                            <p>Username: {user?.username}</p>

                            <p>Username: {user?.email}</p>
                        </>
                    }
                </>
            }
        </>
    );
};

export default Profile;
