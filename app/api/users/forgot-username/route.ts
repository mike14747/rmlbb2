import { NextRequest, NextResponse } from 'next/server';
import { forgotUsername } from '@/lib/api/user';
import { handleAPICatchError } from '@/lib/helpers/handleCatchErrors';

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();
        if (email) return NextResponse.json(null, { status: 400 });

        const result = await forgotUsername(email);
        return result?.code ? NextResponse.json(null, { status: result.code }) : NextResponse.json(null, { status: 500 });
    } catch (error) {
        return handleAPICatchError(error);
    }
}
