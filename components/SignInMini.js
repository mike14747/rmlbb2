import { useState } from 'react';
import PropTypes from 'prop-types';
import { signIn } from 'next-auth/react';
import Button from '../components/Button';

import styles from '../styles/SignInMini.module.css';

const SignInMini = () => {
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
            setError('Login Failed!');
        }
    };

    return (
        <>
            <div className={styles.dropdown}>
                <Button size="small" variant="text">Sign In</Button>

                {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
                <div tabIndex="0" className={styles.dropdownContent}>
                    <form method="post" onSubmit={handleSignIn} className={styles.form}>
                        <label>
                            {/* Username: */}
                            <input
                                required
                                name="username"
                                type="text"
                                value={username}
                                placeholder="Username"
                                aria-label="username"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </label>

                        <label>
                            {/* Password: */}
                            <input
                                required
                                name="password"
                                type="password"
                                value={password}
                                placeholder="Password"
                                aria-label="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </label>

                        <div className={styles.submitBtnContainer}>
                            <Button type="submit" size="medium" variant="contained">Sign In</Button>
                        </div>
                    </form>

                    {error &&
                        <p className={styles.error}>
                            {error}
                        </p>
                    }
                </div>

            </div>
        </>
    );
};

SignInMini.propTypes = {
    showSignin: PropTypes.bool,
};

export default SignInMini;
