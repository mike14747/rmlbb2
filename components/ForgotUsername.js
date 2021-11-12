import { useState } from 'react';
import Button from './Button';

export default function ForgottenUsername() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [showForgotUsername, setShowForgotUsername] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch('/api/auth/forgot-username', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({ email }),
        });

        if (res.status !== 200) setError('An error occurred. Make sure you submitted email address correctly.');
        if (res.status === 200) setSuccess(true);
    };

    return (
        <>
            <div>
                {showForgotUsername
                    ? <Button onClick={() => setShowForgotUsername(false)} size="medium" variant="text">Hide forgot my username</Button>
                    : <Button onClick={() => setShowForgotUsername(true)} size="medium" variant="text">I forgot my username</Button>}
            </div>

            {error && <p className="error">{error}</p>}

            {success && <p>An email has been sent to the email address you entered.</p>}

            {showForgotUsername &&
                <>
                    <p>
                        Enter the email address associated with your account(s) and an email will be sent with the username(s) linked to your email address.
                    </p>

                    <form method="post" onSubmit={handleSubmit}>
                        <label htmlFor="email">Email address:</label>
                        <input id="email" name="email" onChange={(e) => setEmail(e.target.value)} />

                        <Button type="submit">Submit</Button>
                    </form>
                </>
            }
        </>
    );
}
