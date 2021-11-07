import { useState } from 'react';
import PropTypes from 'prop-types';
import { signIn } from 'next-auth/react';
import Button from '../components/Button';

import styles from '../styles/SignIn.module.css';

const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSignIn = async (e) => {
        e.preventDefault();
        const status = await signIn('credentials', {
            redirect: false,
            username: username,
            password: password,
        });

        if (!status.ok || status.status !== 200) {
            setError('Login Failed... check your credentials and try again.');
        }
    };

    return (
        <>
            <p className={styles.warning}>You must be signed in to view this page.</p>

            {error &&
                <p className={styles.error}>
                    {error}
                </p>
            }

            <form method="post" onSubmit={handleSignIn} className={styles.form}>
                <label>
                    Username
                    <input
                        required
                        name="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>

                <label>
                    Password
                    <input
                        required
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>

                <div className={styles.btnContainer}>
                    <Button type="submit" size="btnLarge" variant="btnContained">Sign In</Button>
                </div>
            </form>
        </>
    );
};

SignIn.propTypes = {
    showSignin: PropTypes.bool,
};

export default SignIn;
