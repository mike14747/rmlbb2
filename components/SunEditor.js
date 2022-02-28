import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import customFontSize from './customFontSize';

const SunEditor = dynamic(() => import('suneditor-react'), {
    ssr: false,
});

const { fontColor, hiliteColor, horizontalRule, blockquote, list, formatBlock, align, link } = typeof window === 'object'
    ? require('suneditor/src/plugins')
    : () => false;

const SunEditorComp = ({ initialContent, setContent }) => {
    console.log('initialContent:', initialContent);
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
                defaultValue={initialContent || '<div><br></div>'}
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
                    showPathLabel: false,
                    stickyToolbar: false,
                    plugins: [fontColor, hiliteColor, horizontalRule, blockquote, list, formatBlock, align, customFontSize, link],
                    // textTags: { underline: 'ins' },
                    minHeight: '200px',
                    buttonList: [
                        ['undo', 'redo', 'bold', 'underline', 'italic', 'strike', 'superscript', 'subscript', 'blockquote', 'formatBlock', 'fontSize', 'fontColor', 'hiliteColor', 'removeFormat', 'list', 'align', 'indent', 'outdent', 'horizontalRule', 'link'],
                    ],
                    alignItems: ['left', 'center', 'right'],
                    colorList: ['var(--mg-dark)', 'var(--mg-light)', 'var(--theme-color-yellow-pale)', 'var(--mg-yellow)', 'var(--mg-orange-soft)', 'var(--theme-color-orange)', 'var(--theme-color-red)', 'var(--mg-purple)', 'var(--theme-color-green)', 'var(--mg-blue)', 'var(--theme-color-dirt-faded)', 'var(--theme-color-dirt)', 'var(--mg-gray-1)', 'var(--mg-gray-2)', 'var(--mg-gray-3)', 'var(--mg-gray-4)', 'var(--mg-gray-5)', 'var(--mg-gray-6)', 'var(--mg-gray-7)'],
                    formats: [{ tag: 'div', name: 'Normal' }, { tag: 'pre', name: 'Monospaced' }],
                    // { tag: 'p', name: 'Paragraph' }, { tag: 'blockquote', name: 'Quote' },
                    hrItems: [{ name: 'Horizontal Rule', style: '' }],
                    pasteTagsWhitelist: '',
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
