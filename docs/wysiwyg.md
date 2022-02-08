It seems like the following packages will need to be installed:

-   react-draft-wysiwyg (the React wrapper for draft-js)
-   draft-js
-   draftjs-to-html (used to convert the draft-js state to html for database storage)
-   html-to-draftjs (used to convert html into draft-js state... eg: when someone is editing a post)

```bash
npm i react-draft-wysiwyg draft-js draftjs-to-html html-to-draftjs
```

---

### Labels

You can add custom labels to the toolbar items. These seem to be more of a "title" that shows the custom label on hover than changing the actual text that appears on an item.

Add this object before the _RichTextEditor_ class:

```js
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
```

Then add this to the _Editor_ component:

```jsx
<Editor
    // ...

    localization={{ locale: 'en', translations: editorLabels }}
/>
```

---

### Changing the names of toolbar items

I saw someone trying to add the _displayNames_ object to the blockType object, but it doesn't seem to work.

```jsx
blockType: {
    inDropdown: true,
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
```

---
