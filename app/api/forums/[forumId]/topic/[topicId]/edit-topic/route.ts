import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { editTopic } from '@/lib/api/forum';
import { handleAPICatchError } from '@/lib/helpers/handleCatchErrors';

export async function PUT(request: NextRequest) {
    try {
        const token = await getToken({ req: request });
        if (!token) return NextResponse.json(null, { status: 401 });

        const { id, userId, title, content } = await request.json();

        if (!id || !userId || !title || !content) return NextResponse.json(null, { status: 400 });
        if (token?.id !== userId.toString()) return NextResponse.json(null, { status: 401 });

        const result = await editTopic(id, userId, title, content);
        return result.code
            ? NextResponse.json(null, { status: result.code })
            : NextResponse.json(null, { status: 500 });
    } catch (error) {
        return handleAPICatchError(error);
    }
}
