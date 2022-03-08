import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import Loading from '../components/Loading';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import PasswordResetForm from '../components/PasswordResetForm';

import styles from '../styles/profile.module.css';

const Profile = () => {
    const { data: session, status } = useSession();
    const loading = status === 'loading';

    const router = useRouter();

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

        const res = await fetch('/api/user/update-username', {
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

        const res = await fetch('/api/user/update-email', {
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

        const res = await fetch('/api/user/update-password', {
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
                    setProfileError('An error occurred fetching data.');
                }
                setIsLoading(false);
            };
            fetchData();
        } else {
            setUser(null);
        }
    }, [session, emailUpdateMsg]);

    if (typeof window !== 'undefined' && loading) return null;

    if (!session) router.push('/login?url=/profile');

    if (session) {
        return (
            <>
                <Head>
                    <title>
                        Profile
                    </title>
                </Head>

                <article className="mw-75ch">
                    <h2 className="page-heading">
                        Profile
                    </h2>

                    {isLoading && <Loading />}

                    {profileError && <p className={styles.error}>{profileError}</p>}

                    {user &&
                        <>
                            <div className={styles.currentContainer}>
                                <h3 className={styles.currentHeading}>Current profile information:</h3>

                                <p className={styles.profileItem}><span className={styles.description}>Username: </span>{user?.username}</p>

                                <p className={styles.profileItem}><span className={styles.description}>Password is not visible for security reasons.</span></p>

                                <p className={styles.profileItem}><span className={styles.description}>Email: </span>{user?.email}</p>

                                <p className={styles.profileItem}><span className={styles.description}>Posts: </span>{user?.posts}</p>

                                <p className={styles.profileItem}><span className={styles.description}>Registered Date: </span>{user?.registeredDate}</p>
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
                                    pattern="^(?=.{4,15}$)[a-zA-Z0-9]+(?:[ _-][a-zA-Z0-9]+)*$"
                                    errorMsg="Username must be from 4 to 15 characters in length and not include any special characters other than dashes, spaces and underscores (but only 1 can be used consecutively). Must start and end with a letter or number."
                                />

                                <Button type="submit" size="medium" variant="contained" style="primary">Apply</Button>
                            </form>

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
                </article>
            </>
        );
    }

    return null;
};

export default Profile;
