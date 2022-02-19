import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import 'suneditor/dist/css/suneditor.min.css';

const SunEditor = dynamic(() => import('suneditor-react'), {
    ssr: false,
});

const { fontSize, fontColor, hiliteColor, horizontalRule, blockquote, list, textStyle, formatBlock, align } = typeof window === 'object'
    ? require('suneditor/src/plugins')
    : () => false;

function isEmpty(value) {
    return (
        value.trim()?.length === 0 || value === '<p></p>' || value === '<p><br></p>'
    );
}

const SunEditorComp = ({ setContent }) => {
    const editor = useRef();

    // The sunEditor parameter will be set to the core suneditor instance when this function is called
    const getSunEditorInstance = (sunEditor) => {
        editor.current = sunEditor;
    };

    // const newPre = editor.current.util.createElement('pre');
    // editor.current.nodeChange(newPre, null, null, null);

    const handleChange = (content) => setContent(content);

    return (
        <div>
            <SunEditor
                getSunEditorInstance={getSunEditorInstance}
                placeholder="...start typing"
                height="auto"
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus={true}
                setAllPlugins={false}
                onChange={handleChange}
                setDefaultStyle="font-size: var(--step-0); word-wrap: break-word; white-space: pre-wrap; white-space: break-spaces;"
                setOptions={{
                    showPathLabel: false,
                    plugins: [fontSize, fontColor, hiliteColor, horizontalRule, blockquote, list, textStyle, formatBlock, align],
                    // textTags: { underline: 'ins' },
                    minHeight: '200px',
                    buttonList: [
                        ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
                        // ['blockquote'],
                        ['fontColor', 'hiliteColor', 'textStyle', 'horizontalRule'],
                        ['removeFormat'],
                        ['fontSize', 'formatBlock'],
                        ['list', 'align'],
                        ['undo', 'redo'],
                    ],
                    alignItems: ['left', 'center', 'right'],
                    colorList: ['var(--mg-dark)', 'var(--mg-light)', 'var(--theme-color-yellow-pale)', 'var(--mg-yellow)', 'var(--mg-orange-soft)', 'var(--theme-color-orange)', 'var(--theme-color-red)', 'var(--mg-purple)', 'var(--theme-color-green)', 'var(--mg-blue)', 'var(--theme-color-dirt-faded)', 'var(--theme-color-dirt)', 'var(--mg-gray-1)', 'var(--mg-gray-2)', 'var(--mg-gray-3)', 'var(--mg-gray-4)', 'var(--mg-gray-5)', 'var(--mg-gray-6)', 'var(--mg-gray-7)'],
                    formats: [{ tag: 'p', name: 'Normal' }, { tag: 'blockquote', name: 'Quote' }, { tag: 'pre', name: 'Monospaced' }],
                    hrItems: [ { name: 'Horizontal Rule', style: '' } ],
                }}
            />
        </div>
    );
};
export default SunEditorComp;

SunEditorComp.propTypes = {
    setContent: PropTypes.func,
};
