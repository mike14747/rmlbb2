import React, { Component } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import dynamic from 'next/dynamic';
const Editor = dynamic(
    () => import('react-draft-wysiwyg').then(mod => mod.Editor),
    { ssr: false });

// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styles from '../styles/RichTextEditor.module.css';

const editorLabels = {
    'components.controls.blocktype.normal': 'Paragraph',
    'components.controls.blocktype.code': 'Monospaced',
    // 'components.controls.fontsize[12]': 'Small',
    // 'components.controls.fontsize[16]': 'Normal',
    // 'components.controls.fontsize[24]': 'Large',
    'components.controls.fontsize[var(--mg-step--1)]': 'Small',
    'components.controls.fontsize[var(--mg-step-0])': 'Normal',
    'components.controls.fontsize[var(--mg-step-1)]': 'Large',
};

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
                    onEditorStateChange={this.onEditorStateChange}
                    placeholder="Enter text here..."
                    toolbar={{
                        // options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'],
                        options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'colorPicker', 'link', 'history'],
                        inline: {
                            inDropdown: false,
                            className: styles.inlineDropdown,
                            component: undefined,
                            dropdownClassName: undefined,
                            options: ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript'],
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
                            icon: undefined,
                            // icon: '/images/fontSize.svg',
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

                {/* <textarea
                    width="500px"
                    disabled
                    value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                /> */}
            </div>
        );
    }
}
