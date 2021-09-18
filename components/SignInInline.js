import { useState } from 'react';
import PropTypes from 'prop-types';
import { signIn } from 'next-auth/react';

import styles from '../styles/SignInInline.module.css';

const SignInInline = ({ showSignin }) => {
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
        } else {
            setError(null);
            setUsername('');
            setPassword('');
        }
    };

    return (
        <>
            {showSignin &&
                <>
                    {error &&
                        <p className={styles.error}>
                            {error}
                        </p>
                    }

                    <form method="post" onSubmit={handleSignIn} className={styles.form}>
                        <label>
                            {/* Username: */}
                            <input
                                required
                                name="username"
                                type="text"
                                value={username}
                                placeholder="Username"
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
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </label>

                        <button type="submit" className={styles.submitButton}>
                            Sign in
                        </button>
                    </form>
                </>
            }
        </>
    );
};

SignInInline.propTypes = {
    showSignin: PropTypes.bool,
};

export default SignInInline;