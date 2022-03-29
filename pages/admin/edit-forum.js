import { useState } from 'react';
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
    const [forumError, setForumError] = useState(null);
    const [forumUpdateMsg, setForumUpdateMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleNewForumNameSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        const res = await fetch('/api/forum/add-forum', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({}),
        });

        if (res.status !== 201) {
            res.status === 400 && forumError('An error occurred. Forum name did not make it to the server.');
            res.status === 401 && forumError('An error occurred. You do not have permission for this operation.');
            res.status === 409 && forumError('An error occurred. The forum name you submitted is already in use.');
            res.status === 500 && forumError('A server error occurred. Please try your update again.');
            setForumUpdateMsg('');
        }

        if (res.status === 201) {
            // setForumName('');
            // forumError(null);
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
                </article>
            </>
        );
    }
}
