### When someone adds a new topic

What needs to been changed in MongoDB when someone adds a new topic:

-   Increment that users **posts** total.
-   Increment that forums **topics** and **posts** totals.

---

### Topics vs Posts Totals in a Forum

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

### Parsing the html for display

html-react-parser (uses html-dom-parser under the hood, but doesn't provide a lot of xss protection)

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

Using html-react-parser with dompurify

```js
import parse, { domToReact } from 'html-react-parser';
import DOMPurify from 'dompurify';
import React from 'react';

export default function html(html, opts = {}) {
    return parse(DOMPurify.sanitize(html));
}
```

...more on DOMPurify ([https://www.npmjs.com/package/dompurify](https://www.npmjs.com/package/dompurify))

```js
// basic usage
let clean = DOMPurify.sanitize(dirty);

// set to only allow html and not SVG or MathML
let clean = DOMPurify.sanitize(dirty, { USE_PROFILES: { html: true } });
```

Other possible parsing packages:

-   react-html-parser (uses htmlparser2 under the hood, but hasn't been updated for 4 years)
-   html-to-react (uses htmlparser2 under the hood)

---

### Query to get topic and replies content

This isn't fully working. The final output is only the topic _id and an array of the replies content objects.

```js
[
    {
        $match: {
            forum_id: 7,
            _id: 1424,
            forumActive: true,
            active: true,
        },
    },
    {
        $unwind: {
            path: '$replies',
            preserveNullAndEmptyArrays: true,
        },
    },
    {
        $lookup: {
            from: 'replies',
            localField: 'replies',
            foreignField: '_id',
            as: 'reply',
        },
    },
    {
        $group: {
            _id: '$_id',
            replieWithContent: {
                $push: '$reply',
            },
        },
    },
];
```

---
