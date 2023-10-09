'use client'; // Error components must be Client components

import { useEffect } from 'react';
import Button from '@/components/Button';

export default function Error({ error, reset }: { error: Error; reset: () => void; }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <main id="main" className="error-container">
            <h1 className="error-heading">An error occurred!</h1>

            <Button type="button" size="medium" variant="contained" theme="danger" onClick={() => reset()}>
                Try Again
            </Button>
        </main>
    );
}
