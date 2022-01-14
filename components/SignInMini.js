import { useState } from 'react';
import PropTypes from 'prop-types';
import { signIn } from 'next-auth/react';
import FormInput from '../components/FormInput';
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
                <Button type="submit" size="small" variant="text">Sign In</Button>

                {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
                <div tabIndex="0" className={styles.dropdownContent}>
                    <form method="post" onSubmit={handleSignIn} className={styles.form}>
                        <FormInput
                            name="username"
                            placeholder="Username"
                            type="text"
                            value={username}
                            required={true}
                            pattern="^[a-zA-Z0-9_-]{6,15}$"
                            handleChange={(e) => setUsername(e.target.value)}
                            errorMsg="Username is required and must be from 6 to 15 characters in length."
                            size="small"
                        />

                        <FormInput
                            name="password"
                            placeholder="Password"
                            type="password"
                            value={password}
                            required={true}
                            pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]{8,20}$"
                            handleChange={(e) => setPassword(e.target.value)}
                            errorMsg="Password is required and must be from 8 to 20 characters in length."
                            size="small"
                        />

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
