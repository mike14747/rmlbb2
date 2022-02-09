import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Editor, EditorState, convertToRaw, RichUtils } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

import 'draft-js/dist/Draft.css';
import styles from '../styles/RichTextEditor.module.css';

// DraftEditor.InlineStyleControls.propTypes = {
//     editorState: PropTypes.func,
//     getCurrentInlineStyle: PropTypes.func,
// };

export default function DraftEditor() {
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );

    const handleKeyCommand = (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);

        if (newState) {
            setEditorState(newState);
            return 'handled';
        }

        return 'not-handled';
    };

    const StyleButton = ({ label, style, active, onToggle }) => {
        const toggle = (e) => {
            e.preventDefault();
            onToggle(style);
        };

        let className = 'RichEditor-styleButton';
        if (active) className += ' RichEditor-activeButton';
        if (style === 'BOLD') className += ' btn-bold';
        if (style === 'ITALIC') className += ' btn-em';
        if (style === 'UNDERLINE') className += ' btn-under';
        if (style === 'STRIKETHROUGH') className += ' btn-strike';

        return (
            <span role="button" tabIndex="0" className={className} onMouseDown={toggle}>
                {label}
            </span>
        );
    };

    StyleButton.propTypes = {
        label: PropTypes.string,
        style: PropTypes.string,
        active: PropTypes.bool,
        onToggle: PropTypes.func,
    };

    // const onItalicClick = () => setEditorState(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));

    const toggleInlineStyle = (inlineStyle) => setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));

    const INLINE_STYLES = [
        { label: 'B', style: 'BOLD' },
        { label: 'I', style: 'ITALIC' },
        { label: 'U', style: 'UNDERLINE' },
        { label: 'S', style: 'STRIKETHROUGH' },
        // { label: 'Monospace', style: 'CODE' },
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

            <Editor
                editorState={editorState}
                onChange={setEditorState}
                handleKeyCommand={handleKeyCommand}
            />

            <textarea
                width="500px"
                disabled
                value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
            />
        </div>
    );
}
