import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Loading from '../components/Loading';
import SignIn from '../components/SignIn';

// import styles from '../styles/profile.module.css';

const Profile = () => {
    const { data: session, status } = useSession();
    const loading = status === 'loading';
    const [showSignin, setShowSignin] = useState(false);
    const [user, setContent] = useState(null);
    const [isContentLoaded, setIsContentLoaded] = useState(false);

    useEffect(() => {
        if (session) {
            setIsContentLoaded(false);
            const fetchData = async () => {
                const data = await fetch('/api/user/' + session.user.name)
                    .then(res => res.json())
                    .catch(error => console.log('My error logging:', error));
                data?.length === 1 ? setContent(data[0]) : setContent(null);
                setIsContentLoaded(true);
            };
            fetchData();
        } else {
            setContent(null);
            setIsContentLoaded(false);
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

            <SignIn showSignin={showSignin} />

            {session &&
                <>
                    <p>You are signed in. Here is your current profile information.</p>

                    {!isContentLoaded && <Loading />}

                    {user && isContentLoaded &&
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
