import React, { Component } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import dynamic from 'next/dynamic';
const Editor = dynamic(
    () => import('react-draft-wysiwyg').then(mod => mod.Editor),
    { ssr: false });

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styles from '../styles/RichTextEditor.module.css';

const editorLabels = {
    // Generic
    'generic.add': 'Add',
    'generic.cancel': 'Cancel',

    // BlockType
    'components.controls.blocktype.h1': 'Heading 1',
    'components.controls.blocktype.h2': 'Heading 2',
    'components.controls.blocktype.h3': 'Heading 3',
    'components.controls.blocktype.h4': 'Heading 4',
    'components.controls.blocktype.h5': 'Heading 5',
    'components.controls.blocktype.h6': 'Heading 6',
    'components.controls.blocktype.blockquote': 'Blockquote',
    'components.controls.blocktype.code': 'Code',
    'components.controls.blocktype.blocktype': 'Block Type',
    'components.controls.blocktype.normal': 'Normal',

    // Color Picker
    'components.controls.colorpicker.colorpicker': 'Color Picker',
    'components.controls.colorpicker.text': 'Text',
    'components.controls.colorpicker.background': 'Highlight',

    // Embedded
    'components.controls.embedded.embedded': 'Embedded',
    'components.controls.embedded.embeddedlink': 'Embedded Link',
    'components.controls.embedded.enterlink': 'Enter link',

    // Emoji
    'components.controls.emoji.emoji': 'Emoji',

    // FontFamily
    'components.controls.fontfamily.fontfamily': 'Font',

    // FontSize
    'components.controls.fontsize.fontsize': 'Font Size',

    // History
    'components.controls.history.history': 'History',
    'components.controls.history.undo': 'Undo',
    'components.controls.history.redo': 'Redo',

    // Image
    'components.controls.image.image': 'Image',
    'components.controls.image.fileUpload': 'File Upload',
    'components.controls.image.byURL': 'URL',
    'components.controls.image.dropFileText': 'Drop the file or click to upload',

    // Inline
    'components.controls.inline.bold': 'Bold',
    'components.controls.inline.italic': 'Italic',
    'components.controls.inline.underline': 'Underline',
    'components.controls.inline.strikethrough': 'Strikethrough',
    'components.controls.inline.monospace': 'Monospace',
    'components.controls.inline.superscript': 'Superscript',
    'components.controls.inline.subscript': 'Subscript',

    // Link
    'components.controls.link.linkTitle': 'Link Title',
    'components.controls.link.linkTarget': 'Link Target',
    'components.controls.link.linkTargetOption': 'Open link in new window',
    'components.controls.link.link': 'Link',
    'components.controls.link.unlink': 'Unlink',

    // List
    'components.controls.list.list': 'List',
    'components.controls.list.unordered': 'Unordered',
    'components.controls.list.ordered': 'Ordered',
    'components.controls.list.indent': 'Indent',
    'components.controls.list.outdent': 'Outdent',

    // Remove
    'components.controls.remove.remove': 'Remove',

    // TextAlign
    'components.controls.textalign.textalign': 'Text Align',
    'components.controls.textalign.left': 'Left',
    'components.controls.textalign.center': 'Center',
    'components.controls.textalign.right': 'Right',
    'components.controls.textalign.justify': 'Justify',
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
        return (
            <div className={styles.container + ' mw-90ch'}>
                <Editor
                    localization={{ locale: 'en', translations: editorLabels }}
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
                            className: 'drop-test',
                            component: undefined,
                            dropdownClassName: undefined,
                            options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace', 'superscript', 'subscript'],
                        },
                        blockType: {
                            inDropdown: false,
                            // options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code'],
                            options: ['Normal', 'Blockquote', 'Code'],
                            className: undefined,
                            component: undefined,
                            dropdownClassName: undefined,
                            displayNames: [
                                { label: 'Normally', displayName: 'Normally', style: 'unstyled' },
                                { label: 'Blockquoted', displayName: 'Blockquoted', style: 'blockquote' },
                            ],
                        },
                        fontSize: {
                            // icon: '/images/fontSize.svg',
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
