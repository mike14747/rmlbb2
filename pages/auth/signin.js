import { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import Head from 'next/head';

import styles from '../../styles/signin.module.css';

const SignIn = () => {
    const { data: session, status } = useSession();
    const loading = status === 'loading';
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

        console.log('status:', status);

        (!status.ok || status.status !== 200) ? setError('Login Failed... check your credentials and try again.') : setError(null);
    };

    return (
        <>
            {loading && <p>Loading...</p>}

            {!session &&
                <>
                    <Head>
                        <title>
                            Login
                        </title>
                    </Head>

                    <h2 className="page-heading">Login</h2>

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
