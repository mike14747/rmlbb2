import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useSession } from 'next-auth/react';
// import FormInputForForumName from '@/components/Forum/FormInputForForumName';
// import FormInputForActive from '@/components/Forum/FormInputForActive';
// import Button from '@/components/Button';

import styles from '@/styles/admin.module.css';

export const metadata: Metadata = {
    title: 'RML Baseball - Edit Forum',
};

export default async function EditForumPage() {
    const session = await getServerSession({
        callbacks: { session: ({ token }) => token },
    });

    if (!session) {
        redirect('/login?callbackUrl=/admin');
    }

    // const router = useRouter();

    // const [forums, setForums] = useState(null);
    // const [updatedForums, setUpdatedForums] = useState(null);
    // const [error, setError] = useState(null);
    // const [forumUpdateMsg, setForumUpdateMsg] = useState('');
    // const [isLoading, setIsLoading] = useState(false);

    // useEffect(() => {
    //     if (status === 'authenticated') router.push('/login?callbackUrl=/admin/edit-forum');
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [status]);

    // useEffect(() => {
    //     const abortController = new AbortController();

    //     if (session && session?.user?.role === 'admin') {
    //         setIsLoading(true);

    //         fetch('/api/forum/admin-forum-list', { signal: abortController.signal })
    //             .then(res => res.json())
    //             .then(data => {
    //                 setForums(data);
    //                 setUpdatedForums(data);
    //                 setError(null);
    //             })
    //             .catch(error => {
    //                 if (error.name === 'AbortError') {
    //                     console.error('Data fetching was aborted!');
    //                 } else {
    //                     console.error(error);
    //                     setForums(null);
    //                     setUpdatedForums(null);
    //                     setError('An error occurred fetching data.');
    //                 }
    //             })
    //             .finally(() => setIsLoading(false));
    //     } else {
    //         setForums(null);
    //         setUpdatedForums(null);
    //     }

    //     return () => abortController.abort();
    // }, [session]);

    // const toggleActive = (id, active) => setUpdatedForums(updatedForums.map(forum => forum._id === id ? { ...forum, active } : forum));

    // const handleChangeForumName = (id, name) => setUpdatedForums(updatedForums.map(forum => forum._id === id ? { ...forum, name } : forum));

    // const handleUpdatedForumSubmit = async (_id, name, active) => {
    //     // console.log({ _id, name, active });
    //     setIsLoading(true);

    //     let res = await fetch('/api/forum/edit-forum', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json;charset=utf-8',
    //         },
    //         body: JSON.stringify({
    //             _id,
    //             name,
    //             active,
    //         }),
    //     });

    //     if (res?.status === 200) {
    //         setForums(forums.map(forum => forum._id === _id ? { ...forum, name, active } : forum));
    //         setError(null);
    //         setForumUpdateMsg('The forum: "' + name + '" has been successfully updated!');
    //     } else {
    //         res?.status === 400 && setError('An error occurred. Updated forum data did not make it to the server.');
    //         res?.status === 401 && setError('An error occurred. You do not have permission for this operation.');
    //         res?.status === 409 && setError('An error occurred. The forum name you submitted is already in use.');
    //         (!res || !res.status || res.status === 500) && setError('A server error occurred. Please try your update again.');
    //         setForumUpdateMsg('');
    //     }

    //     setIsLoading(false);
    // };

    if (session.role === 'admin') {
        return (
            <article className={styles.adminContainer}>
                <h2 className={'page-heading ' + styles.adminPageHeading}>
                    Edit Forum
                </h2>

                {/* {isLoading && <Spinner />}

                {error && <p className="error2">{error}</p>}

                {forumUpdateMsg && <p className="success2">{forumUpdateMsg}</p>} */}

                {/* {updatedForums &&
                    updatedForums.map((forum, index) => (
                        <div className={styles.forumRow} key={forum._id}>
                            <div className={styles.gridName}><FormInputForForumName id={forum._id} forumName={forum.name} setForumName={handleChangeForumName} /></div>
                            <div className={styles.gridActive}><FormInputForActive id={forum._id} active={forum.active} setActive={toggleActive} /></div>
                            {(forums[index].active !== updatedForums[index].active || forums[index].name !== updatedForums[index].name) &&
                                <div className={`${styles.updateButtonWrapper} ${styles.gridUpdate}`}><Button type="button" size="small" variant="contained" style="primary" onClick={() => handleUpdatedForumSubmit(forum._id, forum.name, forum.active)}>Update</Button></div>
                            }
                        </div>
                    ))
                } */}

                <p>This is the unfinished edit-forum page.</p>

                <p>You are seeing this page because you are logged in with the role of admin.</p>
            </article>
        );
    }

    return null;
}
