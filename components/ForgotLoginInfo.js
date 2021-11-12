import { useState } from 'react';
import Button from './Button';

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

        if (res.status !== 200) setError('An error occurred. Make sure you submitted your email address correctly.');
        if (res.status === 200) setSuccess(true);
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

        if (res.status !== 200) setError('An error occurred. Make sure you submitted your username and/or email address correctly.');
        if (res.status === 200) setSuccess(true);
    };

    return (
        <>
            <div>
                {showForgotUsername
                    ? <Button onClick={() => setShowForgotUsername(false)} size="medium" variant="text">Hide forgot my username</Button>
                    : <Button onClick={() => {
                        setShowForgotUsername(true);
                        setShowForgotPassword(false);
                    }} size="medium" variant="text">I forgot my Username</Button>}
            </div>

            {error && <p className="error">{error}</p>}

            {success && <p>An email has been sent to the email address you entered.</p>}

            {showForgotUsername &&
                <>
                    <p>
                        Enter the email address associated with your account(s) and an email will be sent with the username(s) linked to your email address.
                    </p>

                    <form method="post" onSubmit={handleUsernameSubmit}>
                        <label htmlFor="email">Email address:</label>
                        <input
                            id="email"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />

                        <Button type="submit">Submit</Button>
                    </form>
                </>
            }

            <div>
                {showForgotPassword
                    ? <Button onClick={() => setShowForgotPassword(false)} size="medium" variant="text">Hide forgot my password</Button>
                    : <Button onClick={() => {
                        setShowForgotPassword(true);
                        setShowForgotUsername(false);
                    }} size="medium" variant="text">I forgot my Password</Button>}
            </div>

            {showForgotPassword &&
                <>
                    <p>
                        Enter the username and email address associated with your account and an email will be sent to you with a link to reset your password.
                    </p>

                    <form method="post" onSubmit={handlePasswordSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input
                            id="username"
                            name="username"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                        />

                        <label htmlFor="email">Email address:</label>
                        <input
                            id="email"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />

                        <Button type="submit">Submit</Button>
                    </form>
                </>
            }
        </>
    );
}
