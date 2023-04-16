'use client';

import React, { useEffect, useState } from 'react';
import { EditorState, convertToRaw, convertFromHTML, Modifier, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import dynamic from 'next/dynamic';

import styles from '../../styles/RichTextEditor.module.css';
// not using the default 'react-draft-wysiwyg.css', but instead am importing my modified version (rich-text.css) by importing it in _app.js

const Editor = dynamic(
    () => import('react-draft-wysiwyg').then(mod => mod.Editor),
    { ssr: false });
const htmlToDraft = typeof window === 'object' && require('html-to-draftjs').default;

// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const editorLabels = {
    'components.controls.blocktype.normal': 'Paragraph',
    'components.controls.blocktype.blockquote': 'Quote',
    'components.controls.blocktype.code': 'Monospace',
    'components.controls.colorpicker.colorpicker': 'Select Color',
    'components.controls.fontsize[var(--step--1)]': 'Small',
    'components.controls.fontsize[var(--step-0])': 'Normal',
    'components.controls.fontsize[var(--step-1)]': 'Large',
};

const fontSizeIconBase64 = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMzIiIGhlaWdodD0iMTYiIHJvbGU9ImltZyIgYXJpYS1sYWJlbD0iZm9udCBzaXplIj4KICAgIDx0aXRsZT5Gb250IFNpemUgYnkgTWlrZSBHdWxsbzwvdGl0bGU+CiAgICA8ZyBzaGFwZS1yZW5kZXJpbmc9ImNyaXNwRWRnZXMiPgogICAgICAgIDxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIzMiIgaGVpZ2h0PSIxNiIgZmlsbD0ibm9uZSIgLz4KICAgIDwvZz4KICAgIDxnIGZpbGw9Im5vbmUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJTZWdvZSBVSSxWZXJkYW5hLEdlbmV2YSxzYW5zLXNlcmlmIiB0ZXh0LXJlbmRlcmluZz0iZ2VvbWV0cmljUHJlY2lzaW9uIiBmb250LXNpemU9IjI0Ij4KICAgICAgICA8dGV4dCB4PSI3IiB5PSIxNiIgZmlsbD0iIzIzMjMyMyI+QTwvdGV4dD4KICAgIDwvZz4KICAgIDxnIGZpbGw9Im5vbmUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJTZWdvZSBVSSxWZXJkYW5hLEdlbmV2YSxzYW5zLXNlcmlmIiB0ZXh0LXJlbmRlcmluZz0iZ2VvbWV0cmljUHJlY2lzaW9uIiBmb250LXNpemU9IjE3Ij4KICAgICAgICA8dGV4dCB4PSIyMCIgeT0iMTYiIGZpbGw9IiMyMzIzMjMiPkE8L3RleHQ+CiAgICA8L2c+CiAgICA8ZyBmaWxsPSJub25lIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iU2Vnb2UgVUksVmVyZGFuYSxHZW5ldmEsc2Fucy1zZXJpZiIgdGV4dC1yZW5kZXJpbmc9Imdlb21ldHJpY1ByZWNpc2lvbiIgZm9udC1zaXplPSIxMCI+CiAgICAgICAgPHRleHQgeD0iMjkiIHk9IjE2IiBmaWxsPSIjMjMyMzIzIj5BPC90ZXh0PgogICAgPC9nPgo8L3N2Zz4=';

export default function RichTextEditor({ initialContent, setContent }) {
    const blocksFromHTML = convertFromHTML(initialContent || '<p></p>');
    const state = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap,
    );
    const [editorState, setEditorState] = useState(
        () => EditorState.createWithContent(state),
    );

    // if there's no initial content to be used with this component, use this to create an empty editor state
    // const [editorState, setEditorState] = useState(
    //     () => EditorState.createEmpty(),
    // );

    const handleEditorChange = (state) => {
        setEditorState(state);
    };

    useEffect(() => {
        setContent(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    }, [editorState, setContent]);

    const editorStyle = {
        fontSize: 'var(--step-0)',
    };

    function handlePastedText(text, html, editorState) {
        // console.log('text:', text, 'html:', html);
        if (text.substring(0, 4) === '<bq>') {
            const cleanedText = text.slice(4) + '<p></p>';

            // this method does not work when pasting text that has html tags in in... it only works when pasting html from something like a browser
            // it does not support nested blockquotes... or any other nested block types for that matter
            // it has an issue with focus in that it places the cursor at the beginning of the pasted content and not in the appended p tag
            // const blocksFromHTML = convertFromHTML(cleanedText);
            // const state = ContentState.createFromBlockArray(
            //     blocksFromHTML.contentBlocks,
            //     blocksFromHTML.entityMap,
            // );
            // const newState = EditorState.push(editorState, state, 'insert-fragment');
            // handleEditorChange(newState);

            // ------------------------------

            // this method works well for pasting text that happens to have html tags in it, but it does not support nested blockquotes... or any other nested block types for that matter
            // it places focus on the empty paragraph added to the end of the pasted text
            const { contentBlocks, entityMap } = htmlToDraft(cleanedText);
            const contentState = Modifier.replaceWithFragment(
                editorState.getCurrentContent(),
                editorState.getSelection(),
                ContentState.createFromBlockArray(contentBlocks, entityMap).getBlockMap(),
            );

            const test = EditorState.push(editorState, contentState, 'insert-fragment');
            handleEditorChange(test);

            // ------------------------------

            // the following was my old way of handling custom pasted text (eg: with a <bq> prefix)
            // const quote = Modifier.setBlockType(
            //     editorState.getCurrentContent(),
            //     editorState.getSelection(),
            //     'blockquote',
            // );

            // const newEditorState1 = EditorState.push(editorState, quote, 'change-block-type');
            // handleEditorChange(newEditorState1);

            // const newEditorState3 = EditorState.push(editorState, merged, 'change-block-data');
            // handleEditorChange(newEditorState3);

            // const newContent = Modifier.insertText(
            //     newEditorState1.getCurrentContent(),
            //     newEditorState1.getSelection(),
            //     cleanedText,
            // );

            // const newEditorState2 = EditorState.push(editorState, newContent, 'insert-characters');
            // handleEditorChange(newEditorState2);

            return 'handled';
        } else {
            return false;
        }
    }

    return (
        <div className={styles.container + ' mw-90ch'}>
            <Editor
                localization={{ locale: 'en', translations: editorLabels }}
                editorStyle={editorStyle}
                editorState={editorState}
                toolbarClassName="toolbar-class"
                wrapperClassName="wrapper-class"
                editorClassName={styles.editor}
                onEditorStateChange={handleEditorChange}
                placeholder="Start here..."
                handlePastedText={handlePastedText}
                toolbar={{
                    // options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'],
                    options: ['inline', 'colorPicker', 'emoji', 'link', 'blockType', 'fontSize', 'list', 'textAlign', 'history'],
                    inline: {
                        inDropdown: false,
                        className: styles.inlineDropdown,
                        component: undefined,
                        dropdownClassName: undefined,
                        options: ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript'],
                    },
                    colorPicker: {
                        className: undefined,
                        component: undefined,
                        popupClassName: undefined,
                        colors: ['var(--mg-dark)', 'var(--mg-light)', 'var(--theme-color-yellow-pale)', 'var(--mg-yellow)', 'var(--mg-orange-soft)', 'var(--theme-color-orange)', 'var(--theme-color-red)', 'var(--mg-purple)', 'var(--theme-color-green)', 'var(--mg-blue)', 'var(--theme-color-dirt-faded)', 'var(--theme-color-dirt)', 'var(--mg-gray-1)', 'var(--mg-gray-2)', 'var(--mg-gray-3)', 'var(--mg-gray-4)', 'var(--mg-gray-5)', 'var(--mg-gray-6)', 'var(--mg-gray-7)'],
                    },
                    link: {
                        inDropdown: false,
                        className: undefined,
                        component: undefined,
                        popupClassName: undefined,
                        dropdownClassName: undefined,
                        showOpenOptionOnHover: true,
                        defaultTargetOption: '_self',
                        options: ['link', 'unlink'],
                        linkCallback: undefined,
                    },
                    emoji: {
                        className: undefined,
                        component: undefined,
                        popupClassName: undefined,
                        emojis: [
                            '😀', '😁', '😂', '😃', '😉', '😋', '😎', '😍', '😗', '🤗', '🤔', '😣', '😫', '😴', '😌', '🤓',
                            '😛', '😜', '😠', '😇', '😷', '😈', '👻', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '🙈',
                            '🙉', '🙊', '👼', '👮', '🕵', '💂', '👳', '🎅', '👸', '👰', '👲', '🙍', '🙇', '🚶', '🏃', '💃',
                            '⛷', '🏂', '🏌', '🏄', '🚣', '🏊', '⛹', '🏋', '🚴', '👫', '💪', '👈', '👉', '👉', '👆', '🖕',
                            '👇', '🖖', '🤘', '🖐', '👌', '👍', '👎', '✊', '👊', '👏', '🙌', '🙏', '🐵', '🐶', '🐇', '🐥',
                            '🐸', '🐌', '🐛', '🐜', '🐝', '🍉', '🍄', '🍔', '🍤', '🍨', '🍪', '🎂', '🍰', '🍾', '🍷', '🍸',
                            '🍺', '🌍', '🚑', '⏰', '🌙', '🌝', '🌞', '⭐', '🌟', '🌠', '🌨', '🌩', '⛄', '🔥', '🎄', '🎈',
                            '🎉', '🎊', '🎁', '🎗', '🏀', '🏈', '🎲', '🔇', '🔈', '📣', '🔔', '🎵', '🎷', '💰', '🖊', '📅',
                            '✅', '❎', '💯',
                        ],
                    },
                    blockType: {
                        inDropdown: true,
                        // options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code'],
                        options: ['Normal', 'Blockquote', 'Code'],
                        className: styles.blockTypeDropdown,
                        component: undefined,
                        dropdownClassName: undefined,
                    },
                    fontSize: {
                        icon: fontSizeIconBase64,
                        // options: ['smaller', 'medium', 'larger'],
                        options: ['var(--step--1)', 'var(--step-0)', 'var(--step-1)'],
                        // options: [12, 16, 24],
                        className: styles.fontSizeDropdown,
                        component: undefined,
                        dropdownClassName: undefined,
                    },
                    list: {
                        inDropdown: true,
                        className: undefined,
                        component: undefined,
                        dropdownClassName: undefined,
                        options: ['unordered', 'ordered', 'indent', 'outdent'],
                    },
                    textAlign: {
                        inDropdown: true,
                        className: undefined,
                        component: undefined,
                        dropdownClassName: undefined,
                        options: ['left', 'center', 'right'],
                    },
                    history: {
                        inDropdown: false,
                        className: undefined,
                        component: undefined,
                        dropdownClassName: undefined,
                        options: ['undo', 'redo'],
                    },
                }}
            />

            {/* <textarea
                disabled
                value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
            /> */}
        </div>
    );
}
