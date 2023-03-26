### Replace all new items from rmlbb-cms

First, you'll need to delete the current data stored on sanity.

-   Open: _/pages/api/news.js_ (this is the api route you have to use because the news page uses the serverless directly to get the initial news items)
-   Change:

```js
import { getMoreNewsItems } from '../../lib/api/news';
// import { deleteAllNewsItems } from '../../lib/api/mutationFunctions';

export default async function news(req, res) {
    if (req.method !== 'GET') res.status(401).end();

    try {
        if (!req.query.start || isNaN(req.query.start)) res.status(400).end();
        const response = await getMoreNewsItems(parseInt(req.query.start));
        // const response = await deleteAllNewsItems();
        response ? res.status(200).json(response) : res.status(500).end();
    } catch (error) {
        res.status(500).end();
    }
}
```

-   To:

```js
// import { getMoreNewsItems } from '../../lib/api/news';
import { deleteAllNewsItems } from '../../lib/api/mutationFunctions';

export default async function news(req, res) {
    if (req.method !== 'GET') res.status(401).end();

    try {
        if (!req.query.start || isNaN(req.query.start)) res.status(400).end();
        // const response = await getMoreNewsItems(parseInt(req.query.start));
        const response = await deleteAllNewsItems();
        response ? res.status(200).json(response) : res.status(500).end();
    } catch (error) {
        res.status(500).end();
    }
}
```

-   Run the local dev server.
-   Navigate to the homepage, then click on "Load more news". This will trigger the deletion of all news items currently in sanity.
-   Return the code in _/pages/api/news.js_ back to its initial state.

Loading the new data into sanity.

-   Navigate to the **rmlbb-cms** folder.
-   Make sure you have the new news data here: "/data/news.ndjson"
-   run:

```bash
sanity dataset import ./data/news.ndjson production --replace
```

-   If you get a "Session not found" error, try "sanity logout", then "sanity login", then repeat the prior import step.

---
