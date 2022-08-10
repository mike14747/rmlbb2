import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import FormInputForForumName from '../../components/FormInputForForumName';
import FormInputForActive from '../../components/FormInputForActive';
import Button from '../../components/Button';

import styles from '../../styles/admin.module.css';

export default function AddForum() {
    const { data: session, status } = useSession();
    const loading = status === 'loading';

    const router = useRouter();

    const [forumName, setForumName] = useState('');
    const [forumNameError, setForumNameError] = useState(null);
    const [forumUpdateMsg, setForumUpdateMsg] = useState('');
    const [active, setActive] = useState(true);

    const handleNewForumNameSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch('/api/forum/add-forum', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({ name: forumName, active }),
        });

        if (res?.status === 201) {
            setForumName('');
            setForumNameError(null);
            setForumUpdateMsg('The new forum: "' + forumName + '" has been successfully added!');
            setActive(true);
        } else {
            res?.status === 400 && setForumNameError('An error occurred. Forum name did not make it to the server.');
            res?.status === 401 && setForumNameError('An error occurred. You do not have permission for this operation.');
            res?.status === 409 && setForumNameError('An error occurred. The forum name you submitted is already in use.');
            (!res || !res.status || res.status === 500) && setForumNameError('A server error occurred. Please try your update again.');
            setForumUpdateMsg('');
        }
    };

    if (typeof window !== 'undefined' && loading) return null;

    if (!session?.user?.role || session.user.role !== 'admin') router.push('/');

    if (session && session?.user?.role === 'admin') {
        return (
            <>
                <Head>
                    <title>
                        RML Baseball - Admin
                    </title>
                </Head>

                <article className={styles.adminContainer}>
                    <h2 className={'page-heading ' + styles.adminPageHeading}>
                        Add Forum
                    </h2>

                    <form className={styles.updateGroup} onSubmit={handleNewForumNameSubmit}>
                        {forumNameError && <p className="error2">{forumNameError}</p>}

                        {forumUpdateMsg && <p className="success2">{forumUpdateMsg}</p>}

                        <FormInputForForumName forumName={forumName} setForumName={setForumName} />

                        <FormInputForActive active={active} setActive={setActive} />

                        <div className={styles.submitButtonWrapper}>
                            <Button type="submit" size="medium" variant="contained" style="primary">Submit</Button>
                        </div>
                    </form>
                </article>
            </>
        );
    }

    return null;
}
