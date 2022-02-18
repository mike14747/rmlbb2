import { useEditor, EditorContent } from '@tiptap/react';
import PropTypes from 'prop-types';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';

import styles from '../styles/Tiptap.module.css';
import Tiptap from '../pages/tiptap';

// const CustomBlockquote = Blockquote.extend({
//     content: 'paragraph*',
// });

const MenuBar = ({ editor }) => {
    if (!editor) {
        return null;
    }

    return (
        <div className="toolbar">
            <div>
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={editor.isActive('bold') ? 'is-active' : ''}
                >
                    bold
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={editor.isActive('italic') ? 'is-active' : ''}
                >
                    italic
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={editor.isActive('underline') ? 'is-active' : ''}
                >
                    underline
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={editor.isActive('strike') ? 'is-active' : ''}
                >
                    strike
                </button>
                <button
                    onClick={() => editor.chain().focus().setParagraph().run()}
                    className={editor.isActive('paragraph') ? 'is-active' : ''}
                >
                    paragraph
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={editor.isActive('bulletList') ? 'is-active' : ''}
                >
                    unordered list
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={editor.isActive('orderedList') ? 'is-active' : ''}
                >
                    ordered list
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    className={editor.isActive('codeBlock') ? 'is-active' : ''}
                >
                    monospace
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    className={editor.isActive('code') ? 'is-active' : ''}
                >
                    code
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={editor.isActive('blockquote') ? 'is-active' : ''}
                >
                    quote
                </button>
                <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
                    hr
                </button>
            </div>

            <div className="btn-group-right">
                <button onClick={() => editor.chain().focus().undo().run()}>
                    undo
                </button>
                <button onClick={() => editor.chain().focus().redo().run()}>
                    redo
                </button>
            </div>
        </div>
    );
};

MenuBar.propTypes = {
    editor: PropTypes.object,
};

const TiptapEditor = ({ setContent }) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
        ],
        content: '',
        autofocus: true,
        editable: true,
        injectCSS: false,
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            setContent(html);
        },
    });

    return (
        <div className={styles.editorContainer}>
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    );
};

export default TiptapEditor;

TiptapEditor.propTypes = {
    setContent: PropTypes.func,
};
