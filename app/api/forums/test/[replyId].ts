import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { getOneReply } from '@/lib/api/forum';
import { handleAPICatchError } from '@/lib/helpers/handleCatchErrors';

export async function GET(request: NextRequest, { params }: { params: Promise<{ replyId: string }>}) {
    try {
        const token = await getToken({ req: request });
        if (!token) return NextResponse.json(null, { status: 401 });

        const { replyId } = await params;

        const result = await getOneReply(parseInt(replyId));
        return result
            ? NextResponse.json(null, { status: 200 })
            : NextResponse.json(null, { status: 500 });
    } catch (error) {
        return handleAPICatchError(error);
    }
}
