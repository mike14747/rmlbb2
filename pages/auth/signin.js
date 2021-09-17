import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { signIn, useSession } from 'next-auth/client';
import { getCsrfToken } from 'next-auth/client';
import Head from 'next/head';

import styles from '../../styles/signin.module.css';

const SignIn = ({ csrfToken }) => {
    const router = useRouter();

    const [session, loading] = useSession();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        if (session) router.push('/');
        if (!session) return;
    }, [session, router]);

    const handleSignIn = async (e) => {
        e.preventDefault();
        const status = await signIn('credentials', {
            redirect: false,
            username: username,
            password: password,
        });
        console.log('status in signin.js:', status);
        if (!status.ok || status.status !== 200) setError('Login Failed... check your credentials and try again.');
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

                    {/* <form method="post" action="/api/auth/callback/credentials" className={styles.form}> */}
                    <form method="post" onSubmit={handleSignIn} className={styles.form}>
                        {/* <input name="csrfToken" type="hidden" defaultValue={csrfToken} /> */}

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

SignIn.propTypes = {
    csrfToken: PropTypes.string,
};

// export async function getServerSideProps(context) {
//     return {
//         props: {
//             csrfToken: await getCsrfToken(context),
//         },
//     };
// }

export default SignIn;
