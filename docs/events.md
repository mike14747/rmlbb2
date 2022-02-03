### Replace all events from rmlbb-cms

First, you'll need to delete the current event data stored on sanity.

-   Open: _/pages/api/past-events.js_ (this is the api route you have to use because the events page uses the serverless directly)
-   Change:

```js
import { getAllActivePastEvents } from '../../lib/api/events';
// import { deleteAllEvents } from '../../lib/api/mutationFunctions';

export default async function pastEvents(req, res) {
    if (req.method !== 'GET') res.status(401).end();

    try {
        const response = await getAllActivePastEvents();
        // const response = await deleteAllEvents();
        response ? res.status(200).json(response) : res.status(500).end();
    } catch (error) {
        res.status(500).end();
    }
}
```

-   To:

```js
// import { getAllActivePastEvents } from '../../lib/api/events';
import { deleteAllEvents } from '../../lib/api/mutationFunctions';

export default async function pastEvents(req, res) {
    if (req.method !== 'GET') res.status(401).end();

    try {
        // const response = await getAllActivePastEvents();
        const response = await deleteAllEvents();
        response ? res.status(200).json(response) : res.status(500).end();
    } catch (error) {
        res.status(500).end();
    }
}

```

-   Run the local dev server.
-   Navigate to the **events** page, then click on "show past events". This will trigger the deletion of all events currently in sanity.
-   Return the code in _/pages/api/past-events.js_ back to its initial state.

Loading the new data into sanity.

-   Navigate to the **rmlbb-cms** folder.
-   Make sure you have the new event data here: "/data/events.ndjson"
-   run:

```bash
sanity dataset import ./data/events.ndjson production --replace
```

-   If you get a "Session not found" error, try "sanity logout", then "sanity login", then repeat the prior import step.

---
