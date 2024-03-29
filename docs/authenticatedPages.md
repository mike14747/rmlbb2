# Authenticated Pages

**NOTE**: These templates are in the process of being updated as of 2023-01-03.

## Protected page template

```js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
// import Link from 'next/link';
import Loading from '../components/Loading';

// import styles from '../styles/some.module.css';

export default function Protected() {
    const { data: session, status } = useSession();
    const loading = status === 'loading';

    const router = useRouter();

    const [protectedData, setProtectedData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();

        if (session) {
            setIsLoading(true);

            fetch('/api/protected-route', { signal: abortController.signal })
                .then((res) => res.json())
                .then((data) => {
                    console.log('data', data);
                    setProtectedData(data);
                    setError(null);
                })
                .catch((error) => {
                    if (error.name === 'AbortError') {
                        console.error('Data fetching was aborted!');
                    } else {
                        console.error(error);
                        setProtectedData(null);
                        setError('An error occurred fetching data.');
                    }
                })
                .finally(() => setIsLoading(false));
        }

        return () => abortController.abort();
    }, [session]);

    if (typeof window !== 'undefined' && loading) return null;

    if (!session) router.push('/login?callbackUrl=/protected');

    if (session) {
        return (
            <>
                <Head>
                    <title>RML Baseball - Protected Page</title>
                </Head>

                <article>
                    <h2 className="page-heading">Protected Page Template</h2>

                    {error && <p className="error">{error}</p>}

                    {isLoading && <Loading />}

                    {protectedData?.length > 0 && (
                        <ul>
                            {protectedData.map((item, index) => (
                                <li key={index}>
                                    Name: {item.name}, Age: {item.age}
                                </li>
                            ))}
                        </ul>
                    )}
                </article>
            </>
        );
    }

    return null;
}
```

---

## Protected api template

```js
import { getSession } from 'next-auth/react';
import { getProtectedData } from '../../lib/api/protected';

export default async function protectedRoute(req, res) {
    if (req.method !== 'GET') res.status(401).end();
    const session = await getSession({ req });
    if (!session) res.status(401).end();

    try {
        const response = await getProtectedData();
        response ? res.status(200).json(response) : res.status(500).end();
    } catch (error) {
        console.error(error);
        res.status(500).end();
    }
}
```

---

## Protected /lib/api serverless functions

These serverless functions only run on the server, so they don't need to be secured. They can be the same as unprotected functions.

This sample doesn't access any external data. It just return s promise with a small array.

```js
export async function getProtectedData() {
    return new Promise((resolve, reject) => {
        resolve([
            { name: 'Kevin', age: 65 },
            { name: 'Mary', age: 57 },
        ]);
    });
}
```

---

## Admin page template

```js
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';

// import styles from '../styles/admin.module.css';

export default function AdminPage() {
    const { data: session, status } = useSession();
    const loading = status === 'loading';

    const router = useRouter();

    if (typeof window !== 'undefined' && loading) return null;

    if (!session || !session.user || !session.user.role || session.user.role !== 'admin') router.push('/');

    if (session && session?.user?.role === 'admin') {
        return (
            <>
                <Head>
                    <title>RML Baseball - Admin</title>
                </Head>

                <article>
                    <h2 className="page-heading">Admin Page</h2>
                </article>
            </>
        );
    }

    return null;
}
```

---

## next.js v13 version

### Regular protected page

```tsx
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { getSomeServerlessFunction } from '@/lib/api/?';
import { Suspense } from 'react';
import Spinner from '@/components/Spinner';

import styles from '@/styles/some.module.css';

export const metadata: Metadata = {
    title: 'RML Baseball - Page Title',
};

export default async function Page() {
    const session = await getServerSession({
        callbacks: { session: ({ token }) => token },
    });

    if (!session) {
        redirect('/login?callbackUrl=/protected-page');
    }

    const someData = await getSomeServerlessFunction();

    if (!someData) return <p className="error">An error occurred fetching data.</p>;

    return (
        <main id="main">
            <article className={styles.forumPageWrapper}>
                <h2 className={'page-heading ' + styles.forumPageHeading}>Page Heading</h2>

                <Suspense fallback={<Spinner size="large" />}>
                    {/* render the data either in this page or via another component */}
                </Suspense>
            </article>
        </main>
    );
}
```

### Admin protected page

```tsx
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';

import styles from '@/styles/admin.module.css';

export const metadata: Metadata = {
    title: 'RML Baseball - Admin Page',
};

export default async function AddForumPage() {
    const session = await getServerSession({
        callbacks: { session: ({ token }) => token },
    });

    if (!session) {
        redirect('/login?callbackUrl=/admin-page');
    }

    if (session.role === 'admin') {
        return (
            <article className={styles.adminContainer}>
                <h2 className={'page-heading ' + styles.adminPageHeading}>Admin Page</h2>

                {/* page content */}
            </article>
        );
    }

    return null;
}
```

---
