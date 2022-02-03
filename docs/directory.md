### Replace all managers from rmlbb-private

First, you'll need to delete the current manager data stored on sanity.

-   Open: _/pages/api/directory.js_
-   Change:

```js
import { getSession } from 'next-auth/react';
import { getManagers } from '../../lib/api/directory';
// import { deleteAllManagers } from '../../lib/api/mutationFunctions';

export default async function directory(req, res) {
    if (req.method !== 'GET') res.status(401).end();
    const session = await getSession({ req });
    if (!session) res.status(401).end();

    try {
        const response = await getManagers();
        // const response = await deleteAllManagers();
        response ? res.status(200).json(response) : res.status(500).end();
    } catch (error) {
        console.error(error);
        res.status(500).end();
    }
}
```

-   To:

```js
import { getSession } from 'next-auth/react';
// import { getManagers } from '../../lib/api/directory';
import { deleteAllManagers } from '../../lib/api/mutationFunctions';

export default async function directory(req, res) {
    if (req.method !== 'GET') res.status(401).end();
    const session = await getSession({ req });
    if (!session) res.status(401).end();

    try {
        // const response = await getManagers();
        const response = await deleteAllManagers();
        response ? res.status(200).json(response) : res.status(500).end();
    } catch (error) {
        console.error(error);
        res.status(500).end();
    }
}
```

-   Run the local dev server.
-   Navigate to the **directory** page (you'll need to be logged in for it to work)
-   Return the code in _/pages/api/directory.js_ back to its initial state.

Loading the new data into sanity.

-   Navigate to the **rmlbb-private** folder.
-   Make sure you have the new manager data here: "/data/managers.ndjson"
-   run:

```bash
sanity dataset import ./data/managers.ndjson production --replace
```

-   If you get a "Session not found" error, try "sanity logout", then "sanity login", then repeat the prior import step.

---

