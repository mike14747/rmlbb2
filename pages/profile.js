import { useState, useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import Loading from '../components/Loading';
import SignIn from '../components/SignIn';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import PasswordResetForm from '../components/PasswordResetForm';

import styles from '../styles/profile.module.css';

const Profile = () => {
    const { data: session, status } = useSession();
    const loading = status === 'loading';

    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [profileError, setProfileError] = useState(null);
    const [usernameError, setUsernameError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [emailError, setEmailError] = useState(null);

    const [emailUpdateMsg, setEmailUpdateMsg] = useState('');

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
            res.status === 400 && setUsernameError('An error occurred. New username is not in the proper format.');
            res.status === 401 && setUsernameError('An error occurred. You do not have permission to make this update.');
            res.status === 409 && setUsernameError('An error occurred. The username you submitted is already in use.');
            res.status === 500 && setUsernameError('A server error occurred. Please try your update again.');
        }

        if (res.status === 200) {
            signOut({ redirect: false });
            setNewUsername('');
            setUsernameError(null);
            setEmailUpdateMsg('');
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
            res.status === 400 && setEmailError('An error occurred. New email is not in the proper format.');
            res.status === 401 && setEmailError('An error occurred. You do not have permission to make this update.');
            res.status === 500 && setEmailError('A server error occurred. Please try your update again.');
        }
        if (res.status === 200) {
            setNewEmail('');
            setEmailError(null);
            setEmailUpdateMsg('Your email address has been successfully updated to: ' + newEmail + '!');
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
            res.status === 400 && setPasswordError('An error occurred. New password is not in the proper format.');
            res.status === 401 && setPasswordError('An error occurred. You do not have permission to make this update.');
            res.status === 500 && setPasswordError('A server error occurred. Please try your update again.');
        }
        if (res.status === 200) {
            signOut({ redirect: false });
            setNewPassword('');
            setrepeatPassword('');
            setPasswordError(null);
            setEmailUpdateMsg('');
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
                    setProfileError('An error occurred fetching user profile data.');
                }
                setIsLoading(false);
            };
            fetchData();
        } else {
            setUser(null);
        }
    }, [session, emailUpdateMsg]);

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
                        {isLoading && <Loading />}

                        {profileError && <p className={styles.error}>{profileError}</p>}

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
                                    {usernameError && <p className={styles.error}>{usernameError}</p>}

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

                                {/* <form className={styles.updateGroup} onSubmit={handleUpdatePasswordSubmit}>
                                    {passwordError && <p className={styles.error}>{passwordError}</p>}

                                    <FormInput
                                        id="newPassword"
                                        label="New Password"
                                        name="newPassword"
                                        type="password"
                                        value={newPassword}
                                        required={true}
                                        handleChange={(e) => setNewPassword(e.target.value)}
                                        pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]{8,20}$"
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
                                </form> */}

                                <PasswordResetForm
                                    handleUpdatePasswordSubmit={handleUpdatePasswordSubmit}
                                    passwordError={passwordError}
                                    newPassword={newPassword}
                                    setNewPassword={setNewPassword}
                                    repeatPassword={repeatPassword}
                                    setrepeatPassword={setrepeatPassword}
                                />

                                <form className={styles.updateGroup} onSubmit={handleUpdateEmailSubmit}>
                                    {emailError && <p className={styles.error}>{emailError}</p>}

                                    {emailUpdateMsg && <p className={styles.success}>{emailUpdateMsg}</p>}

                                    <FormInput
                                        id="newEmail"
                                        label="New Email"
                                        name="newEmail"
                                        type="email"
                                        value={newEmail}
                                        required={true}
                                        handleChange={(e) => setNewEmail(e.target.value)}
                                        pattern="^(?:[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]){1,64}@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$"
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
