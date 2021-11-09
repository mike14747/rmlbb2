import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Loading from '../components/Loading';
import SignIn from '../components/SignIn';
import Button from '../components/Button';

import styles from '../styles/profile.module.css';

const Profile = () => {
    const { data: session, status } = useSession();
    const loading = status === 'loading';

    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (session) {
            setIsLoading(true);
            const fetchData = async () => {
                const data = await fetch('/api/user/' + session.user.name)
                    .then(res => res.json())
                    .catch(error => console.log(error));
                if (data?.length === 1) {
                    setUser(data[0]);
                } else {
                    setUser(null);
                    setError('An error occurred fetching user profile data.');
                }
                setIsLoading(false);
            };
            fetchData();
        } else {
            setUser(null);
        }
    }, [session]);

    return (
        <>
            <Head>
                <title>
                    Profile
                </title>
            </Head>

            <article>
                <h2 className="page-heading">
                    Profile
                </h2>

                {loading && <Loading />}

                {!session && <SignIn />}

                {session &&
                    <>
                        {error && <p className="error">{error}</p>}

                        {isLoading && <Loading />}

                        {user &&
                            <>
                                <h3 className={styles.currentHeading}>Current profile information</h3>

                                <p>Username: {user?.username}</p>

                                <p>Email: {user?.email}</p>

                                <h3 className={styles.updateHeading}>Update your profile information</h3>

                                <label htmlFor="username" className={styles.label}>Update username:</label>
                                <input id="username" type="text" name="username" className={styles.input}></input>
                                <Button size="small" variant="contained">Apply</Button>
                            </>
                        }
                    </>
                }
            </article>
        </>
    );
};

export default Profile;
