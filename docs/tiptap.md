```js
import { Node } from 'tiptap';
import { wrappingInputRule, setBlockType, wrapIn } from 'tiptap-commands';

export default class BlockquoteNode extends Node {
    // choose a unique name
    get name() {
        return 'blockquote';
    }

    // the prosemirror schema object
    // take a look at https://prosemirror.net/docs/guide/#schema for a detailed explanation
    get schema() {
        return {
            content: 'block+',
            group: 'block',
            defining: true,
            draggable: false,
            // define how the editor will detect your node from pasted HTML
            // every blockquote tag will be converted to this blockquote node
            parseDOM: [{ tag: 'blockquote' }],
            // this is how this node will be rendered
            // in this case a blockquote tag with a class called `awesome-blockquote` will be rendered
            // the '0' stands for its text content inside
            toDOM: () => ['blockquote', { class: 'awesome-blockquote' }, 0],
        };
    }

    // this command will be called from menus to add a blockquote
    // `type` is the prosemirror schema object for this blockquote
    // `schema` is a collection of all registered nodes and marks
    command({ type, schema }) {
        return wrapIn(type);
    }

    // here you can register some shortcuts
    // in this case you can create a blockquote with `ctrl` + `>`
    keys({ type }) {
        return {
            'Ctrl->': wrapIn(type),
        };
    }

    // a blockquote will be created when you are on a new line and type `>` followed by a space
    inputRules({ type }) {
        return [wrappingInputRule(/^\s*>\s$/, type)];
    }
}
```

---

```js
// the Tiptap schema API
import { Node } from '@tiptap/core';

const Document = Node.create({
    name: 'doc',
    topNode: true,
    content: 'block+',
});

const Paragraph = Node.create({
    name: 'paragraph',
    group: 'block',
    content: 'inline*',
    parseHTML() {
        return [{ tag: 'p' }];
    },
    renderHTML({ HTMLAttributes }) {
        return ['p', HTMLAttributes, 0];
    },
});

const Text = Node.create({
    name: 'text',
    group: 'inline',
});
```

---

### Issues

p tags are inserted inside other elements (blockquote, li)

There doesn't seem to be an easy way to do dropdowns in the menu.

I still haven't figured out how to do custom schemas.

The underline button inserts the u tag and the strikethrough button inserts the s tag.

---

### Todos

-   Add a link button
-   Add a font color button
-   Possibly add a highlight color button

---
