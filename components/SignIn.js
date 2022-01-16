import { useState } from 'react';
import PropTypes from 'prop-types';
import { signIn } from 'next-auth/react';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import ForgotLoginInfo from '../components/ForgotLoginInfo';

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
            <p className="warning">You must be signed in to view this page.</p>

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
    );
};

SignIn.propTypes = {
    showSignin: PropTypes.bool,
};

export default SignIn;
