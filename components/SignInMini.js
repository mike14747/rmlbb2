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
                            handleChange={(e) => setUsername(e.target.value)}
                            size="small"
                        />

                        <FormInput
                            name="password"
                            placeholder="Password"
                            type="password"
                            value={password}
                            required={true}
                            handleChange={(e) => setPassword(e.target.value)}
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
