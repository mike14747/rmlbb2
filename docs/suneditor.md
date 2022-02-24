### Issues

When using Monospace format, if you hit enter twice to leave the format and switch to a paragraph (like the blockquote format works), it starts a new paragraph, but the cursor jumps back up to the top of the pre tag.

When nesting blockquotes, you can nest 1, but if you try to nest a 2nd one without entering any text, you'll get this error: "Uncaught TypeError: current is null"... with the following description in next.js:

```js
listDiv.querySelector('ul').addEventListener('click', this.pickUp.bind(core));
context.formatBlock._formatList = listDiv.querySelectorAll('li button');
```

I've also gotten this error when doing inline formatting of text, then changing the format to blockquote:

formatEl.innerText is undefined

When starting with a new editor, if I click on blockquote without typing anything, after I type the first character, the cursor jumps back to the beginning and moves the first character I typed to the end. All subsequent input is fine but the first character remains at the end.

