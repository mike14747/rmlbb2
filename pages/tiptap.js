import { useState } from 'react';
import Head from 'next/head';

import TiptapEditor from '../components/TiptapEditor';
export default function Tiptap() {
    const [content, setContent] = useState(null);

    return (
        <section className="mw-90ch">
            <Head>
                <title>
                    RML Baseball - Tiny Editor
                </title>
            </Head>

            <h2 className="page-heading">
                Tiny Editor
            </h2>

            <TiptapEditor setContent={setContent} />
        </section>

    );
}
