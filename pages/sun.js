import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import SunEditorComp from '../components/SunEditor';

// import styles from '../../../styles/forum.module.css';

export default function Sun() {
    const { data: session, status } = useSession();
    const loading = status === 'loading';

    const router = useRouter();

    const [content, setContent] = useState('');

    if (typeof window !== 'undefined' && loading) return null;

    if (!session) {
        router.push('/login?url=/sun');
    }

    return (
        <div className="mw-90ch">
            <Head>
                <title>
                    RML Baseball - Forum
                </title>
            </Head>

            <h2 className="page-heading">
                Sun Editor
            </h2>

            <SunEditorComp setContent={setContent} />

            <aside>
                <textarea className="editor-textarea"
                    disabled
                    value={content}
                />
            </aside>
        </div>
    );
}
