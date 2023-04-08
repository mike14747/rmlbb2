import { useEditor, EditorContent } from '@tiptap/react';
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
import Image from 'next/image';

import styles from '../../../styles/Tiptap.module.css';

const CustomUnderline = Underline.extend({
    renderHTML({ HTMLAttributes }) {
        return ['ins', HTMLAttributes, 0];
    },
});

const CustomCodeBlock = CodeBlock.extend({
    name: 'customCodeBlock',
    renderHTML({ HTMLAttributes }) {
        return ['pre', HTMLAttributes, 0];
    },
});

const CustomPre = Node.create({
    name: 'customPre',
    priority: 1000,

    addOptions() {
        return {
            exitOnArrowDown: true,
            HTMLAttributes: {},
        };
    },
    group: 'block',
    // content: 'inline*',
    content: 'text*',
    parseHTML() {
        return [
            {
                tag: 'pre',
                preserveWhitespace: 'full',
            },
        ];
    },
    renderHTML({ HTMLAttributes }) {
        return ['pre', HTMLAttributes, 0];
    },
    addCommands() {
        return {
            setCustomPre: attributes => ({ commands }) => {
                return commands.setNode(this.name, attributes);
            },
        };
    },
    addKeyboardShortcuts() {
        return {
            // remove this element when at start of document or it is empty
            Backspace: () => {
                console.log('backspace was pressed');
                const { empty, $anchor } = this.editor.state.selection;
                const isAtStart = $anchor.pos === 1;

                if (!empty || $anchor.parent.type.name !== this.name) {
                    return false;
                }

                if (isAtStart || !$anchor.parent.textContent.length) {
                    return this.editor.commands.clearNodes();
                }

                return false;
            },

            // exit node on triple enter
            Enter: ({ editor }) => {
                console.log('enter key was pressed');
                const { state } = editor;
                const { selection } = state;
                const { $from, empty } = selection;

                // console.log('state:', state);
                // console.log('selection:', selection);
                // console.log('$from:', $from);
                // console.log('empty:', empty);

                if (!empty || $from.parent.type !== this.type) {
                    console.log('!empty || $from.parent.type !== this.type');
                    return false;
                }

                const isAtEnd = $from.parentOffset === $from.parent.nodeSize - 2;
                const endsWithDoubleNewline = $from.parent.textContent.endsWith('\n\n');

                if (!isAtEnd || !endsWithDoubleNewline) {
                    console.log('!isAtEnd || !endsWithDoubleNewline');
                    return false;
                }

                return editor
                    .chain()
                    .command(({ tr }) => {
                        tr.delete($from.pos - 2, $from.pos);
                        console.log('inside command');
                        return true;
                    })
                    .exitCode()
                    .run();
            },

            // exit node on arrow down
            ArrowDown: ({ editor }) => {
                console.log('down arrow was pressed');
                if (!this.options.exitOnArrowDown) {
                    return false;
                }

                const { state } = editor;
                const { selection, doc } = state;
                const { $from, empty } = selection;

                if (!empty || $from.parent.type !== this.type) {
                    return false;
                }

                const isAtEnd = $from.parentOffset === $from.parent.nodeSize - 2;

                if (!isAtEnd) {
                    return false;
                }

                const after = $from.after();

                if (after === undefined) {
                    return false;
                }

                const nodeAfter = doc.nodeAt(after);

                if (nodeAfter) {
                    return false;
                }

                return editor.commands.exitCode();
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
                <Image
                    src="/images/tiptap/bold.svg"
                    alt={'Bold'}
                    title={'Bold'}
                    width={32}
                    height={32}
                />
            </button>

            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={editor.isActive('italic') ? 'is-active' : ''}
            >
                <Image
                    src="/images/tiptap/italic.svg"
                    alt={'Italic'}
                    title={'Italic'}
                    width={32}
                    height={32}
                />
            </button>

            <button
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={editor.isActive('underline') ? 'is-active' : ''}
            >
                <Image
                    src="/images/tiptap/underline.svg"
                    alt={'Underline'}
                    title={'Underline'}
                    width={32}
                    height={32}
                />
            </button>

            <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={editor.isActive('strike') ? 'is-active' : ''}
            >
                <Image
                    src="/images/tiptap/strikethrough.svg"
                    alt={'Strikethrough'}
                    title={'Strikethrough'}
                    width={32}
                    height={32}
                />
            </button>

            {/* <button
                onClick={() => editor.chain().focus().toggleSuperscript().run()}
                className={editor.isActive('superscript') ? 'is-active' : ''}
            >
                <Image
                    src="/images/tiptap/superscript.svg"
                    alt={'Superscript'}
                    title={'Superscript'}
                    width={32}
                    height={32}
                />
            </button>

            <button
                onClick={() => editor.chain().focus().toggleSubscript().run()}
                className={editor.isActive('subscript') ? 'is-active' : ''}
            >
                <Image
                    src="/images/tiptap/subscript.svg"
                    alt={'Subscript'}
                    title={'Subscript'}
                    width={32}
                    height={32}
                />
            </button> */}

            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={editor.isActive('bulletList') ? 'is-active' : ''}
            >
                <Image
                    src="/images/tiptap/list-unordered.svg"
                    alt={'Unordered List'}
                    title={'Unordered List'}
                    width={32}
                    height={32}
                />
            </button>

            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={editor.isActive('orderedList') ? 'is-active' : ''}
            >
                <Image
                    src="/images/tiptap/list-ordered.svg"
                    alt={'Ordered List'}
                    title={'Ordered List'}
                    width={32}
                    height={32}
                />
            </button>

            <button
                onClick={() => editor.chain().focus().setParagraph().run()}
                className={editor.isActive('paragraph') ? 'is-active' : ''}
            >
                <Image
                    src="/images/tiptap/paragraph.svg"
                    alt={'Paragraph'}
                    title={'Paragraph'}
                    width={32}
                    height={32}
                />
            </button>

            <button
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className={editor.isActive('customCodeBlock') ? 'is-active' : ''}
            >
                <Image
                    src="/images/tiptap/braces-line.svg"
                    alt={'Monospaced'}
                    title={'Monospaced'}
                    width={32}
                    height={32}
                />
            </button>

            <button
                onClick={() => editor.chain().focus().setCustomPre().run()}
                className={editor.isActive('customPre') ? 'is-active' : ''}
            >
                <Image
                    src="/images/tiptap/braces-line.svg"
                    alt={'Monospaced'}
                    title={'Monospaced'}
                    width={32}
                    height={32}
                />
            </button>

            <button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={editor.isActive('blockquote') ? 'is-active' : ''}
            >
                <Image
                    src="/images/tiptap/double-quotes-l.svg"
                    alt={'Quote'}
                    title={'Quote'}
                    width={32}
                    height={32}
                />
            </button>

            <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
                <Image
                    src="/images/tiptap/separator.svg"
                    alt={'Horizontal Line'}
                    title={'Horizontal Line'}
                    width={32}
                    height={32}
                />
            </button>

            {/* <button
                onClick={() => editor.chain().focus().setMark('textStyle', { fontSize: '100px' }).run()}
            >
                Big
            </button> */}

            <button onClick={() => editor.chain().focus().setTextAlign('left').run()} className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}>
                <Image
                    src="/images/tiptap/align-left.svg"
                    alt={'Align Left'}
                    title={'Align Left'}
                    width={32}
                    height={32}
                />
            </button>

            <button onClick={() => editor.chain().focus().setTextAlign('center').run()} className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}>
                <Image
                    src="/images/tiptap/align-center.svg"
                    alt={'Align Center'}
                    title={'Align Center'}
                    width={32}
                    height={32}
                />
            </button>

            <button onClick={() => editor.chain().focus().setTextAlign('right').run()} className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}>
                <Image
                    src="/images/tiptap/align-right.svg"
                    alt={'Align Right'}
                    title={'Align Right'}
                    width={32}
                    height={32}
                />
            </button>

            <button onClick={() => editor.chain().focus().undo().run()}>
                <Image
                    src="/images/tiptap/undo.svg"
                    alt={'Undo'}
                    title={'Undo'}
                    width={32}
                    height={32}
                />
            </button>

            <button onClick={() => editor.chain().focus().redo().run()}>
                <Image
                    src="/images/tiptap/redo.svg"
                    alt={'Redo'}
                    title={'Redo'}
                    width={32}
                    height={32}
                />
            </button>
        </div>
    );
};

export default function TiptapEditor({ initialContent, setContent }) {
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
}
