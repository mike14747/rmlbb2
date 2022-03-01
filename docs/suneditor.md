### Issues

When using Monospace format, if you hit enter twice to leave the format and switch to a paragraph (like the blockquote format works), it starts a new paragraph, but the cursor jumps back up to the top of the pre tag.

When nesting blockquotes, you can nest 1, but if you try to nest a 2nd one without entering any text, you'll get this error: "Uncaught TypeError: current is null"... with the following description in next.js:

```js
listDiv.querySelector('ul').addEventListener('click', this.pickUp.bind(core));
context.formatBlock._formatList = listDiv.querySelectorAll('li button');
```

I've also gotten this error when doing inline formatting of text, then changing the format to blockquote: "formatEl.innerText is undefined"

When starting with a new editor, if I click on blockquote without typing anything, after I type the first character, the cursor jumps back to the beginning and moves the first character I typed to the end. All subsequent input is fine but the first character remains at the end. This doesn't happen when I use the blockquote button.

You can't highlight all text blocks by mousing over them. If you try to do that, only the first block will be highlighted. The only way to highlight all blocks is using ctrl-A.

There's no way to add custom titles to the color pickers. They just show the css variable name as the title.

I've tried setting the defaultState to div tags, but when you modify and/or delete content, sometimes it'll revert back to using p tags.
