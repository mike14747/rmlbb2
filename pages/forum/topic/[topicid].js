import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Head from 'next/head';

// import styles from '../../../styles/forum.module.css';

export default function Topic() {
    const { data: session, status } = useSession();
    const loading = status === 'loading';

    const router = useRouter();
    const topicId = router.query.topicid;

    const [topic, setTopic] = useState(null);

    useEffect(() => {
        if (session) {
            setTopic('This is topic 1');
        }
    }, [session]);

    if (typeof window !== 'undefined' && loading) return null;

    if (!session) {
        router.push(`/login?url=/forum/topic/${topicId}`);
    }

    return (
        <>
            <Head>
                <title>
                    RML Baseball - Forum
                </title>
            </Head>

            <article>
                <p>You have selected a topic and reached that topic&apos;s page.</p>
                <p>{topic}</p>
            </article>
        </>
    );
}
