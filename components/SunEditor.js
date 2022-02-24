import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import customFontSize from './customFontSize';

// import 'suneditor/dist/css/suneditor.min.css';

const SunEditor = dynamic(() => import('suneditor-react'), {
    ssr: false,
});

const { fontColor, hiliteColor, horizontalRule, blockquote, list, formatBlock, align, link } = typeof window === 'object'
    ? require('suneditor/src/plugins')
    : () => false;

// function isEmpty(value) {
//     return (
//         value.trim()?.length === 0 || value === '<p></p>' || value === '<p><br></p>'
//     );
// }

const SunEditorComp = ({ initialContent, setContent }) => {
    const editor = useRef();

    // The sunEditor parameter will be set to the core suneditor instance when this function is called
    const getSunEditorInstance = (sunEditor) => {
        editor.current = sunEditor;
    };

    const handleChange = (content) => setContent(content);

    return (
        <div>
            <SunEditor
                getSunEditorInstance={getSunEditorInstance}
                defaultValue={initialContent || '<p></p>'}
                placeholder="...start typing"
                height="auto"
                minHeight="200px"
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus={true}
                setAllPlugins={false}
                onChange={handleChange}
                setDefaultStyle="font-size: var(--step-0); word-wrap: break-word; white-space: pre-wrap; white-space: break-spaces;"
                setOptions={{
                    linkTargetNewWindow: true,
                    linkProtocol: 'https://',
                    // linkRel: ['noreferrer', 'noopener'],
                    showPathLabel: false,
                    stickyToolbar: false,
                    plugins: [fontColor, hiliteColor, horizontalRule, blockquote, list, formatBlock, align, customFontSize, link],
                    // textTags: { underline: 'ins' },
                    minHeight: '200px',
                    // fontSize: [12, 16, 24],
                    buttonList: [
                        ['undo', 'redo', 'bold', 'underline', 'italic', 'strike', 'superscript', 'subscript', 'formatBlock', 'fontSize', 'fontColor', 'hiliteColor', 'removeFormat', 'list', 'align', 'horizontalRule', 'link'],
                    ],
                    alignItems: ['left', 'center', 'right'],
                    colorList: ['var(--mg-dark)', 'var(--mg-light)', 'var(--theme-color-yellow-pale)', 'var(--mg-yellow)', 'var(--mg-orange-soft)', 'var(--theme-color-orange)', 'var(--theme-color-red)', 'var(--mg-purple)', 'var(--theme-color-green)', 'var(--mg-blue)', 'var(--theme-color-dirt-faded)', 'var(--theme-color-dirt)', 'var(--mg-gray-1)', 'var(--mg-gray-2)', 'var(--mg-gray-3)', 'var(--mg-gray-4)', 'var(--mg-gray-5)', 'var(--mg-gray-6)', 'var(--mg-gray-7)'],
                    formats: [{ tag: 'p', name: 'Paragraph' }, { tag: 'blockquote', name: 'Quote' }, { tag: 'pre', name: 'Monospaced' }],
                    hrItems: [{ name: 'Horizontal Rule', style: '' }],
                }}
            />
        </div>
    );
};
export default SunEditorComp;

SunEditorComp.propTypes = {
    initialContent: PropTypes.string,
    setContent: PropTypes.func,
};
