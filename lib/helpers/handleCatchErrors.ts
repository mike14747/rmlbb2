import { NextResponse } from 'next/server';

export function handleAPICatchError(error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    console.log('error:', errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
}
