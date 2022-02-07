import React, { Component } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import dynamic from 'next/dynamic';
const Editor = dynamic(
    () => import('react-draft-wysiwyg').then(mod => mod.Editor),
    { ssr: false });

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styles from '../styles/RichTextEditor.module.css';

// import FontSize from '../assets/fontSize.svg';
// const fontSizeIconBase64 = 'data:image/svg+xml;base64,CjxpbWcgc3R5bGU9IndpZHRoOiAxMDAlOyBoZWlnaHQ6IGF1dG87IGZsb2F0OiBsZWZ0O2JhY2tncm91bmQtaW1hZ2U6IG5vbmU7IiBzcmM9Ii8vcGljLm9ubGluZXdlYmZvbnRzLmNvbS9zdmcvaW1nXzEzMzQxNC5wbmciIGFsdD0iRm9udCBTaXplIiB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCI+CiAg';
// const test = 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgOTAwIDkwMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgOTAwIDkwMCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PGc+PHBhdGggZD0iTTc1MC41LDM1MSIvPjxwYXRoIGQ9Ik01OTQuMiwyMDMuMyIvPjxwYXRoIGQ9Ik0xODkuMSw0NDkuNmw5NC4xLTMwMi41bDk0LjQsMzAyLjVIMTg5LjEgTTM2OC4xLDMxLjFIMjI0LjZMMTAsNzA4LjZoOTkuNWw1MC44LTE2MS4yaDI0OC43bDUxLjYsMTYxLjJoMTI0LjZMMzY4LjEsMzEuMSIvPjxwYXRoIGQ9Ik01OTMuNiw1NTEuNmw1NC42LTE3NS4xbDU0LjYsMTc1LjFINTkzLjYgTTY5Ny4zLDMwOS4yaC04My4xbC02Ni43LDIxMGwyOC45LDkwLjRsMC40LTEuM2gxNDQuMWwzMCwxMDAuMmg3Mkw3MDEuMywzMjEuOUw2OTcuMywzMDkuMiIvPjwvZz48L3N2Zz4=';

export default class RichTextEditor extends Component {

    constructor(props) {
        super(props);

        this.state = {
            editorState: EditorState.createEmpty(),
        };
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    };

    render() {
        const { editorState } = this.state;
        return (
            <div className={styles.container + ' mw-90ch'}>
                <Editor
                    editorState={editorState}
                    toolbarClassName="toolbar-class"
                    wrapperClassName="wrapper-class"
                    editorClassName="editor-class"
                    onEditorStateChange={this.onEditorStateChange}
                    placeholder="Enter text here..."
                    toolbar={{
                        // options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'],
                        options: ['inline', 'blockType', 'list', 'textAlign', 'colorPicker', 'link', 'history'],
                        inline: {
                            inDropdown: false,
                            className: undefined,
                            component: undefined,
                            dropdownClassName: undefined,
                            options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace', 'superscript', 'subscript'],
                        },
                        blockType: {
                            inDropdown: true,
                            // options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code'],
                            options: ['Normal', 'Blockquote', 'Code'],
                            className: undefined,
                            component: undefined,
                            dropdownClassName: undefined,
                        },
                        fontSize: {
                            // icon: '/images/fontSize.svg',
                            // icon: test;
                            options: ['smaller', 'medium', 'larger'],
                            className: undefined,
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
                        colorPicker: {
                            className: undefined,
                            component: undefined,
                            popupClassName: undefined,
                            colors: ['var(--theme-color-orange)', 'var(--theme-color-red)', 'var(--theme-color-green)', 'var(--theme-color-dirt)', 'var(--mg-gray-1)', 'var(--mg-gray-2)', 'var(--mg-gray-3)', 'var(--mg-gray-4)', 'var(--mg-gray-5)', 'var(--mg-gray-6)', 'var(--mg-gray-7)', 'var(--mg-light)', 'var(--mg-yellow)', 'var(--mg-orange-soft)', 'var(--mg-yellow-pale)', 'var(--mg-purple)'],
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
                    width="500px"
                    disabled
                    value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                />
            </div>
        );
    }
}
