'use client';

// import { useState } from 'react';
// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
// import FormInputForUsername from '../../components/FormInputForUsername';
// import FormInputForNewPassword from '../../components/FormInputForNewPassword';
// import FormInputForEmail from '../../components/FormInputForEmail';
// import FormInputForActive from '../../components/Forum/FormInputForActive';
// import Button from '../../components/Button';
import Spinner from '../../components/Spinner';

import styles from '../../../styles/admin.module.css';

export default function AddUser() {
    const { data: session, status } = useSession();

    // const router = useRouter();

    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');
    // const [repeatPassword, setRepeatPassword] = useState('');
    // const [email, setEmail] = useState('');
    // const [active, setActive] = useState(true);
    // const [newUserMsg, setNewUsereMsg] = useState('');
    // const [newUserError, setNewUserError] = useState(null);

    // useEffect(() => {
    //     if (status === 'authenticated') router.push('/login?callbackUrl=/admin/add-user');
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [status]);

    // const handleNewUserSubmit = async (e) => {
    //     e.preventDefault();

    //     const res = await fetch('/api/user/add-user', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json;charset=utf-8',
    //         },
    //         body: JSON.stringify({
    //             username,
    //             password,
    //             email,
    //             active,
    //         }),
    //     });

    //     if (res?.status === 201) {
    //         setUsername('');
    //         setPassword('');
    //         setEmail('');
    //         setActive(true);
    //         setNewUserError(null);
    //         setNewUsereMsg('The new user: "' + username + '" has been successfully added!');
    //         setActive(true);
    //     } else {
    //         res?.status === 400 && setNewUserError('An error occurred. New user did not make it to the server.');
    //         res?.status === 401 && setNewUserError('An error occurred. You do not have permission for this operation.');
    //         res?.status === 409 && setNewUserError('An error occurred. The username you submitted is already in use.');
    //         (!res || !res.status || res.status === 500) && setNewUserError('A server error occurred. Please try your update again.');
    //         setNewUsereMsg('');
    //     }
    // };

    if (status === 'loading') return <Spinner size="large" />;

    if (session?.user?.role === 'admin') {
        return (
            <article className={styles.adminContainer}>
                <h2 className={'page-heading ' + styles.adminPageHeading}>
                    Add User
                </h2>

                {/* <form className={styles.updateGroup} onSubmit={handleNewUserSubmit}>
                    {newUserError && <p className="error2">{newUserError}</p>}

                    {newUserMsg && <p className="success2">{newUserMsg}</p>}

                    <FormInputForUsername username={username} setUsername={setUsername} />

                    <FormInputForNewPassword password={password} setPassword={setPassword} repeatPassword={repeatPassword} setRepeatPassword={setRepeatPassword} />

                    <FormInputForEmail email={email} setEmail={setEmail} />

                    <FormInputForActive active={active} setActive={setActive} />

                    <div className={styles.submitButtonWrapper}>
                        <Button type="submit" size="medium" variant="contained" style="primary">Submit</Button>
                    </div>
                </form> */}

                <p>This is the unfinished add-user page.</p>
            </article>
        );
    }

    return null;
}
