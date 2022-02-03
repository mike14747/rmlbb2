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
                .then(res => res.json())
                .then(data => {
                    console.log('data', data);
                    setProtectedData(data);
                    setError(null);
                })
                .catch(error => {
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

    if (!session) {
        router.push('/login?url=/protected');
    }

    return (
        <>
            <Head>
                <title>
                    RML Baseball - Protected Page
                </title>
            </Head>

            <article>
                <h2 className="page-heading">
                    Protected Page Template
                </h2>

                {error && <p className="error">{error}</p>}

                {isLoading && <Loading />}

                {protectedData?.length > 0 &&
                    <ul>
                        {protectedData.map((item, index) => (
                            <li key={index}>Name: {item.name}, Age: {item.age}</li>
                        ))}
                    </ul>
                }
            </article>
        </>
    );
}
