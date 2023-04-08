# Forum

## When someone adds a new topic

What needs to been changed in MongoDB when someone adds a new topic:

-   Increment that users **posts** total.
-   Increment that forums **topics** and **posts** totals.

---

## Topics vs Posts Totals in a Forum

Topics are the total number of new topics in a forum.

Posts are the total number of posts in a forum... which includes:

-   New topics
-   Replies to topics

Posts is kind of a combining of topics and replies.

Examples:

-   If a forum has 10 topics with no replies to any of them, they will be shown as 10 topics and 10 posts.
-   If a forum has 10 topics with 20 total replies to them, they will be shown as 10 topics and 30 posts.
-   If a forum has 1 topic with 100 replies to any of them, they will be shown as 1 topic and 101 posts.

---

## Parsing the html for display

**html-react-parser** (uses html-dom-parser under the hood, but doesn't provide a lot of xss protection).

```js
import parse from 'html-react-parser';

return parse('<p>...some text...</p>');

// Because the parser returns an array for adjacent elements, make sure it's nested under a parent element when appropriate
return <div>{parse('<p>sibling 1</p><p>sibling 2</p>')}</div>;
```

... or with the optional second options parameter

```js
import parse from 'html-react-parser';

export function replaceNode() {// ...}

return parse('<p>...some text...</p>', {
    {
      replace: replaceNode,
    },
    ...opts,
});
```

### Using html-react-parser with sanitize-html

```js
import parse from 'html-react-parser';
import sanitizeHtml from 'sanitize-html';

<div className={styles.topicBody}>{parse(sanitizeHtml(topicData.content))}</div>;
```

---
