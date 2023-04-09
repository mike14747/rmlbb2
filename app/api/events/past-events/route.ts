import { NextResponse } from 'next/server';
import { getAllActivePastEvents } from '@/lib/api/events';
import { handleAPICatchError } from '@/lib/helpers/handleCatchErrors';

export async function GET() {
    try {
        const data = await getAllActivePastEvents();
        return data ? NextResponse.json(data, { status: 200 }) : NextResponse.json(null, { status: 500 });
    } catch (error) {
        return handleAPICatchError(error);
    }
}
