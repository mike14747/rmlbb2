import { useState } from 'react';
import FormInput from './FormInput';
import Button from './Button';

import styles from '../styles/ForgotLoginInfo.module.css';

export default function ForgottenUsername() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [showForgotUsername, setShowForgotUsername] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);

    const handleUsernameSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch('/api/auth/forgot-username', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({ email }),
        });

        if (res.status !== 200) {
            setSuccess(false);
            setError('An error occurred. Make sure you submitted your email address correctly.');
        }
        if (res.status === 200) {
            setError(false);
            setSuccess(true);
            setEmail('');
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch('/api/auth/reset-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({ username, email }),
        });

        if (res.status !== 200) {
            setSuccess(false);
            res.status === 400 && setError('An error occurred. Your username and/or email are not valid.');
            res.status === 401 && setError('An error occurred. You do not have permission to make this request.');
            res.status === 500 && setError('A server error occurred. Please try your request again.');
        }
        if (res.status === 200) {
            setError(false);
            setSuccess(true);
            setUsername('');
            setEmail('');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.upper}>
                <div className={styles.btnContainer}>
                    {showForgotUsername
                        ? <Button onClick={() => setShowForgotUsername(false)} size="medium" variant="text">Hide forgot my Username</Button>
                        : <Button onClick={() => {
                            setShowForgotUsername(true);
                            setShowForgotPassword(false);
                            setError(false);
                            setSuccess(false);
                            setUsername('');
                            setEmail('');
                        }} size="medium" variant="text">I forgot my Username</Button>
                    }

                    <span aria-hidden="true" className={styles.divider}>¯ \ _ (ツ) _ / ¯</span>
                </div>

                <div className={styles.btnContainer}>
                    {showForgotPassword
                        ? <Button onClick={() => setShowForgotPassword(false)} size="medium" variant="text">Hide forgot my Password</Button>
                        : <Button onClick={() => {
                            setShowForgotPassword(true);
                            setShowForgotUsername(false);
                            setError(false);
                            setSuccess(false);
                            setUsername('');
                            setEmail('');
                        }} size="medium" variant="text">I forgot my Password</Button>}
                </div>
            </div>

            {showForgotUsername &&
                <div className={styles.lower}>
                    <h3>Forgot my Username</h3>
                    <p className="text-left">
                        Enter the email address associated with your account(s) and an email will be sent with the username(s) linked to your email address.
                    </p>

                    {error && <p className="error">{error}</p>}

                    {success && <p className="success">An email has been sent to the email address you entered.</p>}

                    <form method="post" onSubmit={handleUsernameSubmit} className="form">
                        <FormInput
                            id="email"
                            label="Email address"
                            name="email"
                            type="email"
                            required={true}
                            pattern="^(?:[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]){1,64}@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$"
                            value={email}
                            handleChange={(e) => setEmail(e.target.value)}
                            errorMsg="Please enter a valid email address."
                        />

                        <Button type="submit">Submit</Button>
                    </form>
                </div>
            }

            {showForgotPassword &&
                <div className={styles.lower}>
                    <h3>Forgot my Password</h3>
                    <p className="text-left">
                        Enter the username and email address associated with your account and an email will be sent to you with a link to reset your password.
                    </p>

                    {error && <p className="error">{error}</p>}

                    {success && <p className="success">An email has been sent to the email address you entered.</p>}

                    <form method="post" onSubmit={handlePasswordSubmit} className="form">
                        <FormInput
                            id="username"
                            label="Username"
                            name="username"
                            type="text"
                            required={true}
                            pattern="^[a-zA-Z0-9_-]{6,15}$"
                            value={username}
                            handleChange={(e) => setUsername(e.target.value)}
                            errorMsg="Username is required and must be from 6 to 15 characters in length."
                            step="any"
                        />

                        <FormInput
                            id="email"
                            label="Email address"
                            name="email"
                            type="email"
                            required={true}
                            pattern="^(?:[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]){1,64}@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$"
                            value={email}
                            handleChange={(e) => setEmail(e.target.value)}
                            errorMsg="Please enter a valid email address."
                        />

                        <Button type="submit">Submit</Button>
                    </form>
                </div>
            }
        </div>
    );
}
