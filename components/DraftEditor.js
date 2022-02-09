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

    // const onItalicClick = () => setEditorState(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));

    const toggleInlineStyle = (inlineStyle) => setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));

    const INLINE_STYLES = [
        { label: 'B', style: 'BOLD', title: 'Bold' },
        { label: 'I', style: 'ITALIC', title: 'Italic' },
        { label: 'U', style: 'UNDERLINE', title: 'Underline' },
        { label: 'and', style: 'STRIKETHROUGH', title: 'Strikethrough' },
        { label: 'pre', style: 'CODE', title: 'Monospaced' },
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

    return (
        <div className={styles.container + ' mw-90ch'}>
            {/* <button onClick={onItalicClick}><em>I</em></button> */}

            <InlineStyleControls
                editorState={editorState}
                onToggle={toggleInlineStyle}
            />

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
