'use client';

import { useState } from 'react';
import TiptapEditor from '@/components/Tiptap/TiptapEditor';

export default function Tiptap() {
    const [content, setContent] = useState('');

    return (
        <div className="mw-90ch">
            <h2 className="page-heading">
                TipTap Editor
            </h2>

            <TiptapEditor initialContent={''} setContent={setContent} />

            <aside>
                <textarea className="editor-textarea"
                    disabled
                    value={content}
                />
            </aside>
        </div>
    );
}