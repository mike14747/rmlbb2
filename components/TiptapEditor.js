import { useEditor, EditorContent } from '@tiptap/react';
import PropTypes from 'prop-types';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
// import Superscript from '@tiptap/extension-superscript';
// import Subscript from '@tiptap/extension-subscript';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import CodeBlock from '@tiptap/extension-code-block';
import Placeholder from '@tiptap/extension-placeholder';
// import Paragraph from '@tiptap/extension-paragraph';
import { Node } from '@tiptap/core';

import styles from '../styles/Tiptap.module.css';

const CustomUnderline = Underline.extend({
    renderHTML({ HTMLAttributes }) {
        return ['ins', HTMLAttributes, 0];
    },
});

const CustomCodeBlock = CodeBlock.extend({
    renderHTML({ HTMLAttributes }) {
        return ['pre', HTMLAttributes, 0];
    },
});

const CustomPre = Node.create({
    name: 'customPre',
    priority: 1000,

    addOptions() {
        return {
            HTMLAttributes: {},
        };
    },
    group: 'block',
    content: 'inline*',
    parseHTML() {
        return [
            {
                tag: 'pre',
                // preserveWhitespace: 'full',
            },
        ];
    },
    renderHTML({ HTMLAttributes }) {
        return ['pre', HTMLAttributes, 0];
    },
    addCommands() {
        return {
            setCustomPre: () => ({ commands }) => {
                return commands.setNode(this.name);
            },
        };
    },
});

// changes the default block wrapper from <p> to <div>
// const CustomParagraph = Paragraph.extend({
//     parseHTML() {
//         return [{ tag: 'div' }];
//     },
//     renderHTML({ HTMLAttributes }) {
//         return ['div', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
//     },
// });

const MenuBar = ({ editor }) => {
    if (!editor) {
        return null;
    }

    return (
        <div className="toolbar">
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={editor.isActive('bold') ? 'is-active' : ''}
            >
                <img src="/images/tiptap/bold.svg" alt="Bold" title="Bold" />
            </button>

            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={editor.isActive('italic') ? 'is-active' : ''}
            >
                <img src="/images/tiptap/italic.svg" alt="Italic" title="Italic" />
            </button>

            <button
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={editor.isActive('underline') ? 'is-active' : ''}
            >
                <img src="/images/tiptap/underline.svg" alt="Underline" title="Underline" />
            </button>

            <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={editor.isActive('strike') ? 'is-active' : ''}
            >
                <img src="/images/tiptap/strikethrough.svg" alt="Strikethrough" title="Strikethrough" />
            </button>

            {/* <button
                onClick={() => editor.chain().focus().toggleSuperscript().run()}
                className={editor.isActive('superscript') ? 'is-active' : ''}
            >
                <img src="/images/tiptap/superscript.svg" alt="Superscript" title="Superscript" />
            </button>

            <button
                onClick={() => editor.chain().focus().toggleSubscript().run()}
                className={editor.isActive('subscript') ? 'is-active' : ''}
            >
                <img src="/images/tiptap/subscript.svg" alt="Subscript" title="Subscript" />
            </button> */}

            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={editor.isActive('bulletList') ? 'is-active' : ''}
            >
                <img src="/images/tiptap/list-unordered.svg" alt="Unordered List" title="Unordered List" />
            </button>

            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={editor.isActive('orderedList') ? 'is-active' : ''}
            >
                <img src="/images/tiptap/list-ordered.svg" alt="Ordered List" title="Ordered List" />
            </button>

            <button
                onClick={() => editor.chain().focus().setParagraph().run()}
                className={editor.isActive('paragraph') ? 'is-active' : ''}
            >
                <img src="/images/tiptap/paragraph.svg" alt="Paragraph" title="Paragraph" />
            </button>

            {/* <button
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className={editor.isActive('codeBlock') ? 'is-active' : ''}
            >
                <img src="/images/tiptap/braces-line.svg" alt="Monospaced" title="Monospaced" />
            </button> */}

            <button
                onClick={() => editor.chain().focus().setCustomPre().run()}
                className={editor.isActive('customPre') ? 'is-active' : ''}
            >
                <img src="/images/tiptap/braces-line.svg" alt="Monospaced" title="Monospaced" />
            </button>

            <button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={editor.isActive('blockquote') ? 'is-active' : ''}
            >
                <img src="/images/tiptap/double-quotes-l.svg" alt="Quote" title="Quote" />
            </button>

            <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
                <img src="/images/tiptap/separator.svg" alt="Horizontal Line" title="Horizontal Line" />
            </button>

            {/* <button
                onClick={() => editor.chain().focus().setMark('textStyle', { fontSize: '100px' }).run()}
            >
                Big
            </button> */}

            <button onClick={() => editor.chain().focus().setTextAlign('left').run()} className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}>
                <img src="/images/tiptap/align-left.svg" alt="Align Left" title="Align Left" />
            </button>

            <button onClick={() => editor.chain().focus().setTextAlign('center').run()} className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}>
                <img src="/images/tiptap/align-center.svg" alt="Align Center" title="Align Center" />
            </button>

            <button onClick={() => editor.chain().focus().setTextAlign('right').run()} className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}>
                <img src="/images/tiptap/align-right.svg" alt="Align Right" title="Align Right" />
            </button>

            <button onClick={() => editor.chain().focus().undo().run()}>
                <img src="/images/tiptap/undo.svg" alt="Undo" title="Undo" />
            </button>

            <button onClick={() => editor.chain().focus().redo().run()}>
                <img src="/images/tiptap/redo.svg" alt="Redo" title="Redo" />
            </button>
        </div>
    );
};

MenuBar.propTypes = {
    editor: PropTypes.object,
};

const TiptapEditor = ({ initialContent, setContent }) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            CustomUnderline,
            TextStyle,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            // Superscript,
            // Subscript,
            CustomCodeBlock,
            Placeholder.configure({
                placeholder: '...start typing',
            }),
            // CustomParagraph,
            CustomPre,
        ],
        content: initialContent || '',
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
    initialContent: PropTypes.string,
    setContent: PropTypes.func,
};
