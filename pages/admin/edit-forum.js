import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import FormInputForForumName from '../../components/FormInputForForumName';
import FormInputForActive from '../../components/FormInputForActive';
import Button from '../../components/Button';
import Loading from '../../components/Loading';

import styles from '../../styles/admin.module.css';

export default function EditForum() {
    const { data: session, status } = useSession();
    const loading = status === 'loading';

    const router = useRouter();

    const [forums, setForums] = useState(null);
    const [error, setError] = useState(null);
    const [forumUpdateMsg, setForumUpdateMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const abortController = new AbortController();

        if (session && session?.user?.role === 'admin') {
            setIsLoading(true);

            fetch('/api/forum/admin-forum-list', { signal: abortController.signal })
                .then(res => res.json())
                .then(data => {
                    setForums(data);
                    setError(null);
                })
                .catch(error => {
                    if (error.name === 'AbortError') {
                        console.error('Data fetching was aborted!');
                    } else {
                        console.error(error);
                        setForums(null);
                        setError('An error occurred fetching data.');
                    }
                })
                .finally(() => setIsLoading(false));
        } else {
            setForums(null);
        }

        return () => abortController.abort();
    }, [session]);

    const toggleActive = (id, active) => setForums(forums.map(forum => forum._id === id ? { ...forum, active } : forum));

    const handleChangeForumName = (id, name) => setForums(forums.map(forum => forum._id === id ? { ...forum, name } : forum));

    const handleNewForumNameSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        const res = await fetch('/api/forum/edit-forum-name', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({}),
        });

        if (res.status !== 201) {
            res.status === 400 && error('An error occurred. Forum name did not make it to the server.');
            res.status === 401 && error('An error occurred. You do not have permission for this operation.');
            res.status === 409 && error('An error occurred. The forum name you submitted is already in use.');
            res.status === 500 && error('A server error occurred. Please try your update again.');
            setForumUpdateMsg('');
        }

        if (res.status === 201) {
            // setForumName('');
            // error(null);
            // setForumUpdateMsg('The new forum: "' + forumName + '" has been successfully added!');
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
                        Edit Forum
                    </h2>

                    {isLoading && <Loading />}

                    {error && <p className="error2">{error}</p>}

                    {forumUpdateMsg && <p className="success2">{forumUpdateMsg}</p>}

                    {forums &&
                        forums.map(forum => (
                            <div className={styles.forumRow} key={forum._id}>
                                <FormInputForForumName id={forum._id} forumName={forum.name} setForumName={handleChangeForumName} />
                                <FormInputForActive id={forum._id} active={forum.active} setActive={toggleActive} />
                                {/* {forum.name} - {forum._id} - {forum.order} - {forum.active ? 'Active' : 'Inactive'} */}
                            </div>
                        ))
                    }
                </article>
            </>
        );
    }
}
