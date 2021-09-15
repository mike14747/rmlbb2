import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/client';

const Auth = () => {
    const [session, loading] = useSession();
    console.log('Session (in Auth.js):', session);

    return (
        <div>
            {!session &&
                <>
                    <div>You are not signed in.</div>
                    <button onClick={signIn}>Sign in</button>
                </>
            }

            {session &&
                <>
                    <div>Signed in as: {session.user.name}</div>
                    <button onClick={signOut}>Sign out</button>
                </>
            }
        </div>
    );
};

export default Auth;
