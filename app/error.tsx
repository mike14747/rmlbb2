'use client'; // Error components must be Client components

import { useEffect } from 'react';
import Button from '@/components/Button';

export default function Error({ error, reset }: { error: Error; reset: () => void; }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="error-container">
            <h2>An error occurred!</h2>

            <Button type="button" size="medium" variant="contained" theme="danger" onClick={() => reset()}>
                Try Again
            </Button>
        </div>
    );
}
