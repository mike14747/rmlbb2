import { useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import ForgotLoginInfo from '../components/ForgotLoginInfo';
import Loading from '../components/Loading';

export default function Login() {
    const { status } = useSession();

    const router = useRouter();
    let redirectUrl = router.query.callbackUrl || '/';

    const notRedirectable = ['/reset-link', '/reset-password-success', '/login'];
    const notRedirectableCheck = notRedirectable.filter(url => redirectUrl.includes(url));
    if (notRedirectableCheck.length > 0) redirectUrl = '/';

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

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

    if (status === 'loading') return <Loading />;

    if (status === 'authenticated') router.push(redirectUrl);

    if (status === 'unauthenticated') {
        return (
            <>
                <Head>
                    <title>
                        RML Baseball - Login
                    </title>
                </Head>

                <article className="mw-90ch">
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
                </article>
            </>
        );
    }
}
