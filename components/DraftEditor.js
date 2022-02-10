import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Editor, EditorState, convertToRaw, RichUtils } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

import 'draft-js/dist/Draft.css';
import styles from '../styles/RichTextEditor.module.css';

export default function DraftEditor() {
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );

    const editorRef = useRef();

    useEffect(() => editorRef?.current?.focus(), [editorRef]);

    const handleKeyCommand = (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);

        if (newState) {
            setEditorState(newState);
            return 'handled';
        }

        return 'not-handled';
    };

    const StyleButton = ({ label, style, active, onToggle, title }) => {
        const toggle = (e) => {
            e.preventDefault();
            onToggle(style);
        };

        let btnClassName = 'RichEditor-styleButton';
        if (active) btnClassName += ' RichEditor-activeButton';

        let labelClassName = 'btn-text';
        if (style === 'BOLD') labelClassName += ' btn-text-bold';
        if (style === 'ITALIC') labelClassName += ' btn-text-em';
        if (style === 'UNDERLINE') labelClassName += ' btn-text-under';
        if (style === 'STRIKETHROUGH') labelClassName += ' btn-text-strike';
        if (style === 'CODE') labelClassName += ' btn-text-mono';

        return (
            <button className={btnClassName} onMouseDown={toggle} title={title}>
                <span className={labelClassName}>
                    {label}
                </span>
            </button>
        );
    };

    StyleButton.propTypes = {
        label: PropTypes.string,
        style: PropTypes.string,
        active: PropTypes.bool,
        onToggle: PropTypes.func,
        title: PropTypes.string,
    };

    const StyleDropdown = ({ blockOptions, label, style, active, onToggle, title }) => {
        const toggle = e => {
            let value = e.target.value;
            onToggle(value);
        };

        return (
            <select value={active} onChange={toggle}>
                <option value="">Paragraph</option>
                {blockOptions.map(element => {
                    return (
                        <option key={element.title} value={element.style}>
                            {element.label}
                        </option>
                    );
                })}
            </select>
        );
    };

    StyleDropdown.propTypes = {
        blockOptions: PropTypes.array,
        label: PropTypes.string,
        style: PropTypes.string,
        active: PropTypes.string,
        onToggle: PropTypes.func,
        title: PropTypes.string,
    };

    // const onItalicClick = () => setEditorState(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));

    const toggleInlineStyle = (inlineStyle) => setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
    const toggleBlockType = (blockType) => setEditorState(RichUtils.toggleBlockType(editorState, blockType));

    const INLINE_STYLES = [
        { label: 'B', style: 'BOLD', title: 'Bold' },
        { label: 'I', style: 'ITALIC', title: 'Italic' },
        { label: 'U', style: 'UNDERLINE', title: 'Underline' },
        { label: 'and', style: 'STRIKETHROUGH', title: 'Strikethrough' },
        { label: 'pre', style: 'CODE', title: 'Monospaced' },
    ];

    const BLOCK_TYPES = [
        { label: 'H1', style: 'header-one', title: 'Heading 1' },
        { label: 'H2', style: 'header-two', title: 'Heading 2' },
        { label: 'H3', style: 'header-three', title: 'Heading 3' },
        { label: 'H4', style: 'header-four', title: 'Heading 4' },
        { label: 'H5', style: 'header-five', title: 'Heading 5' },
        { label: 'H6', style: 'header-six', title: 'Heading 6' },
        { label: 'Blockquote', style: 'blockquote', title: 'Quote' },
        { label: 'UL', style: 'unordered-list-item', title: 'Unordered List' },
        { label: 'OL', style: 'ordered-list-item', title: 'Ordered List' },
        { label: '{ }', style: 'code-block', title: 'Code' },
    ];

    const InlineStyleControls = (props) => {
        const currentStyle = props.editorState.getCurrentInlineStyle();

        return (
            <div className="RichEditor-controls">
                {INLINE_STYLES.map((type) =>
                    <StyleButton
                        key={type.label}
                        active={currentStyle.has(type.style)}
                        label={type.label}
                        onToggle={props.onToggle}
                        style={type.style}
                        title={type.title}
                    />,
                )}
            </div>
        );
    };

    InlineStyleControls.propTypes = {
        editorState: PropTypes.object,
        onToggle: PropTypes.func,
    };

    const BlockStyleControls = (props) => {
        const { editorState } = props;
        const selection = editorState.getSelection();
        const blockType = editorState
            .getCurrentContent()
            .getBlockForKey(selection.getStartKey())
            .getType();

        return (
            <div className="RichEditor-controls">
                {BLOCK_TYPES.map((type) =>
                    <StyleButton
                        key={type.label}
                        active={type.style === blockType}
                        label={type.label}
                        onToggle={props.onToggle}
                        style={type.style}
                        title={type.title}
                    />,
                )}
            </div>
        );
    };

    BlockStyleControls.propTypes = {
        editorState: PropTypes.object,
        onToggle: PropTypes.func,
    };

    const BlockStyleControls2 = (props) => {
        const { editorState } = props;
        const selection = editorState.getSelection();
        const blockType = editorState
            .getCurrentContent()
            .getBlockForKey(selection.getStartKey())
            .getType();

        return (
            <div className="RichEditor-controls">
                <StyleDropdown
                    blockOptions={BLOCK_TYPES}
                    active={blockType}
                    onToggle={props.onToggle}
                />
            </div>
        );
    };

    BlockStyleControls2.propTypes = {
        editorState: PropTypes.object,
        onToggle: PropTypes.func,
    };

    return (
        <div className={styles.container + ' mw-90ch'}>
            {/* <button onClick={onItalicClick}><em>I</em></button> */}

            <div className="toolbar">
                <InlineStyleControls
                    editorState={editorState}
                    onToggle={toggleInlineStyle}
                />

                <BlockStyleControls
                    editorState={editorState}
                    onToggle={toggleBlockType}
                />
            </div>

            {/* <div aria-hidden="true" onClick={focus}> */}

            <Editor
                editorState={editorState}
                onChange={setEditorState}
                handleKeyCommand={handleKeyCommand}
                // placeholder="...enter text here"
                editorRef={editorRef}
            />
            {/* </div> */}

            <textarea
                width="500px"
                disabled
                value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
            />
        </div>
    );
}
