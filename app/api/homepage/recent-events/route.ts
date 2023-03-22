import { NextResponse } from 'next/server';
import { getNextUpcomingEvents } from '../../../../lib/api/events';

export async function GET() {
    try {
        const data = await getNextUpcomingEvents();
        if (!data) return NextResponse.json(null, { status: 500 });
        return data ? NextResponse.json(data, { status: 200 }) : NextResponse.json(null, { status: 500 });
    } catch (error) {
        if (error instanceof Error) {
            console.log('error:', error.message);
            return NextResponse.json({ error: error.message }, { status: 500 });
        } else {
            console.log('error:', error);
            return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
        }
    }
}
