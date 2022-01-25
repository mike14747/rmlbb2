import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { signIn } from 'next-auth/react';
import Head from 'next/head';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import ForgotLoginInfo from '../components/ForgotLoginInfo';
import Loading from '../components/Loading';

const Login = () => {
    const { data: session, status } = useSession();
    const loading = status === 'loading';

    const router = useRouter();
    const { url, ...rest } = router.query;
    const redirectUrl = url || '/';

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    if (typeof window !== 'undefined' && loading) return null;

    if (session) {
        router.push(redirectUrl);
        // router.push({
        //     pathname: redirectUrl,
        //     query: { ...rest },
        // }, redirectUrl);
    }

    const handleSignIn = async (e) => {
        e.preventDefault();
        const loginStatus = await signIn('credentials', {
            redirect: false,
            username: username,
            password: password,
        });

        if (!loginStatus?.ok || loginStatus?.status !== 200) {
            setError('Login Failed... check your credentials and try again.');
        }
    };

    return (
        <>
            <Head>
                <title>
                    RML Baseball - Login
                </title>
            </Head>

            {loading && <Loading />}

            {!loading && status === 'unauthenticated' &&
                <>
                    <h2 className="page-heading">
                        Login
                    </h2>

                    {error &&
                        <p className="validation-error">
                            {error}
                        </p>
                    }

                    <form method="post" onSubmit={handleSignIn} className="form">
                        <FormInput
                            id="username"
                            label="Username"
                            name="username"
                            type="text"
                            value={username}
                            required={true}
                            handleChange={(e) => setUsername(e.target.value)}
                        />

                        <FormInput
                            id="password"
                            label="Password"
                            name="password"
                            type="password"
                            value={password}
                            required={true}
                            handleChange={(e) => setPassword(e.target.value)}
                        />

                        <div className="btn-container">
                            <Button type="submit" size="medium" variant="contained">Sign In</Button>
                        </div>
                    </form>

                    <ForgotLoginInfo />
                </>
            }
        </>
    );
};

Login.propTypes = {
    showSignin: PropTypes.bool,
};

export default Login;
