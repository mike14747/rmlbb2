import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import dynamic from 'next/dynamic';
const Editor = dynamic(
    () => import('react-draft-wysiwyg').then(mod => mod.Editor),
    { ssr: false });

// not using the default 'react-draft-wysiwyg.css', but instead am importing my modified version (rich-text.css) by importing it in _app.js
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import styles from '../styles/RichTextEditor.module.css';

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

export default function RichTextEditor({ setContent }) {
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );

    const handleEditorChange = (state) => {
        setEditorState(state);
        setContent(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    };

    const editorStyle = {
        fontSize: 'var(--step-0)',
    };

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
                handlePastedText={() => false}
                toolbar={{
                    // options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'],
                    options: ['inline', 'colorPicker', 'link', 'blockType', 'fontSize', 'list', 'textAlign', 'history'],
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

            <textarea
                disabled
                value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
            />
        </div>
    );
}

RichTextEditor.propTypes = {
    setContent: PropTypes.func,
};
