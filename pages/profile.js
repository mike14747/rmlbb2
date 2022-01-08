import { useState, useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';
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
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatPassword, setrepeatPassword] = useState('');

    const handleUpdateUsernameSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch('/api/auth/update-username', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({ newUsername }),
        });

        if (res.status !== 200) {
            setSuccess(false);
            setError('An error occurred. Please submit your new username again.');
        }
        if (res.status === 200) {
            signOut({ redirect: false });
            setNewUsername('');
            setError(null);
            setSuccess(true);
        }
    };

    const handleUpdateEmailSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch('/api/auth/update-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({ newEmail }),
        });

        if (res.status !== 200) {
            setSuccess(false);
            setError('An error occurred. Please submit your new email again.');
        }
        if (res.status === 200) {
            signOut({ redirect: false });
            setNewEmail('');
            setError(null);
            setSuccess(true);
        }
    };

    const handleUpdatePasswordSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch('/api/auth/update-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({ newPassword }),
        });

        if (res.status !== 200) {
            setSuccess(false);
            setError('An error occurred. Please submit your new password again.');
        }
        if (res.status === 200) {
            signOut({ redirect: false });
            setNewPassword('');
            setError(null);
            setSuccess(true);
        }
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

            <article className={styles.profileContainer}>
                <h2 className="page-heading">
                    Profile
                </h2>

                {loading && <Loading />}

                {!session && <SignIn />}

                {session &&
                    <>
                        {error && <p className="error">{error}</p>}

                        {isLoading && <Loading />}

                        {success && <p>Your update has been applied.</p>}

                        {user &&
                            <>
                                <div className={styles.currentContainer}>
                                    <h3 className={styles.currentHeading}>Current profile information:</h3>

                                    <p className={styles.profileItem}><span className={styles.description}>Username: </span>{user?.username}</p>

                                    <p className={styles.profileItem}><span className={styles.description}>Password is not visible for security reasons.</span></p>

                                    <p className={styles.profileItem}><span className={styles.description}>Email: </span>{user?.email}</p>
                                </div>

                                <h3 className={styles.updateHeading}>Update your profile information:</h3>

                                <p className={styles.note}>
                                    <strong>Note:</strong> changing your username and/or password will log you out.
                                </p>

                                <form className={styles.updateGroup} onSubmit={handleUpdateUsernameSubmit}>
                                    <FormInput
                                        id="newUsername"
                                        label="New Username"
                                        name="newUsername"
                                        type="text"
                                        value={newUsername}
                                        required={true}
                                        handleChange={(e) => setNewUsername(e.target.value)}
                                        pattern="^[a-zA-Z0-9_-]{6,15}$"
                                        errorMsg="New Username must be from 6 to 15 characters in length and not include any special characters."
                                    />

                                    <Button type="submit" size="medium" variant="contained" style="primary">Apply</Button>
                                </form>

                                <form className={styles.updateGroup} onSubmit={handleUpdatePasswordSubmit}>
                                    <FormInput
                                        id="newPassword"
                                        label="New Password"
                                        name="newPassword"
                                        type="password"
                                        value={newPassword}
                                        required={true}
                                        handleChange={(e) => setNewPassword(e.target.value)}
                                        pattern="^(?:[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]){1, 64}@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0, 61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0, 61}[a-zA-Z0-9])?)+$"
                                        errorMsg="New Password must be from 8 to 20 characters in length."
                                    />

                                    <FormInput
                                        id="repeatPassword"
                                        label="Repeat New Password"
                                        name="repeatPassword"
                                        type="password"
                                        value={repeatPassword}
                                        required={true}
                                        handleChange={(e) => setrepeatPassword(e.target.value)}
                                        pattern={newPassword}
                                        errorMsg="Passwords do not match."
                                    />

                                    <Button type="submit" size="medium" variant="contained" style="primary">Apply</Button>
                                </form>

                                <form className={styles.updateGroup} onSubmit={handleUpdateEmailSubmit}>
                                    <FormInput
                                        id="newEmail"
                                        label="New Email"
                                        name="newEmail"
                                        type="email"
                                        value={newEmail}
                                        required={true}
                                        handleChange={(e) => setNewEmail(e.target.value)}
                                        pattern="^(?:[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]){1, 64}@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0, 61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0, 61}[a-zA-Z0-9])?)+$"
                                        errorMsg="Please enter a valid email address."
                                    />

                                    <Button type="submit" size="medium" variant="contained" style="primary">Apply</Button>
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
