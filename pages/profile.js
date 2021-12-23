import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Loading from '../components/Loading';
import SignIn from '../components/SignIn';
import FormInput from '../components/FormInput';
import Button from '../components/Button';

import styles from '../styles/profile.module.css';

const Profile = () => {
    const { data: session, status } = useSession();
    const loading = status === 'loading';

    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const [newUsername, setNewUsername] = useState('');

    const handleUpdateUsernameSubmit = async (e) => {
        e.preventDefault();

        console.log('submitted new username of:', newUsername);

        const res = await fetch('/api/auth/update-username', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({ newUsername }),
        });

        if (res.status !== 200) setError('An error occurred. Please submit your new username again.');
        if (res.status === 200) setSuccess(true);
    };

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

                        {success && <p>You username has been updated.</p>}

                        {user &&
                            <>
                                <h3 className={styles.currentHeading}>Current profile information</h3>

                                <p>Username: {user?.username}</p>

                                <p>Email: {user?.email}</p>

                                <h3 className={styles.updateHeading}>Update your profile information</h3>

                                <form className="form" onSubmit={handleUpdateUsernameSubmit}>
                                    <FormInput
                                        id="newUsername"
                                        label="New Username"
                                        name="newUsername"
                                        type="text"
                                        value={newUsername}
                                        required={true}
                                        pattern="^[a-zA-Z0-9_-]{6,15}$"
                                        handleChange={(e) => setNewUsername(e.target.value)}
                                        errorMsg="New Username must be from 6 to 15 characters in length and not include any special characters."
                                    />

                                    <Button size="small" variant="contained">Apply</Button>
                                </form>
                            </>
                        }
                    </>
                }
            </article>
        </>
    );
};

export default Profile;
