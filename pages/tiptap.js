import { useState } from 'react';
import Head from 'next/head';

import TiptapEditor from '../components/TiptapEditor';
export default function Tiptap() {
    const [content, setContent] = useState('');

    return (
        <div className="mw-90ch">
            <Head>
                <title>
                    RML Baseball - TipTap Editor
                </title>
            </Head>

            <h2 className="page-heading">
                TipTap Editor
            </h2>

            <TiptapEditor setContent={setContent} />

            <aside>
                <textarea className="editor-textarea"
                    disabled
                    value={content}
                />
            </aside>
        </div>
    );
}
