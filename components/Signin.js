import { useState } from 'react';
import { signIn, useSession } from 'next-auth/client';

import styles from '../styles/signin.module.css';

const SignIn = () => {
    const [session, loading] = useSession();
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

        (!status.ok || status.status !== 200) ? setError('Login Failed... check your credentials and try again.') : setError(null);
    };

    return (
        <>
            {loading && <p>Loading...</p>}

            {!session &&
                <>
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

                        <button type="submit" className={styles.submitButton}>
                            Sign in
                        </button>
                    </form>
                </>
            }
        </>
    );
};

export default SignIn;
