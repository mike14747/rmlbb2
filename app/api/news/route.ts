import { NextRequest, NextResponse } from 'next/server';
import { getNewsItems } from '@/lib/api/news';
// import { deleteAllNewsItems } from '@/lib/api/mutationFunctions';
import { handleAPICatchError } from '@/lib/helpers/handleCatchErrors';

export async function GET(request: NextRequest) {
    try {
        const { start, num } = await request.json();
        if (!start || !num) return NextResponse.json(null, { status: 400 });

        // const response = await deleteAllNewsItems();
        // return response ? NextResponse.json(null, { status: 200 }) : NextResponse.json(null, { status: 500 });

        const data = await getNewsItems(parseInt(start), parseInt(num));
        return data ? NextResponse.json(data, { status: 200 }) : NextResponse.json(null, { status: 500 });
    } catch (error) {
        return handleAPICatchError(error);
    }
}
