import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { addTopic } from '@/lib/api/forum';
import { handleAPICatchError } from '@/lib/helpers/handleCatchErrors';

export async function POST(request: NextRequest) {
    try {
        const token = await getToken({ req: request });
        if (!token) return NextResponse.json(null, { status: 401 });

        const { userId, username, forumId, forumName, title, content } = await request.json();

        if (!userId || !username || !forumId || !forumName || !title || !content) return NextResponse.json(null, { status: 400 });
        if (token?.id !== userId) return NextResponse.json(null, { status: 401 });

        const result = await addTopic(parseInt(userId), username, forumId, forumName, title, content);
        return result.code
            ? NextResponse.json(null, { status: result.code })
            : NextResponse.json(null, { status: 500 });
    } catch (error) {
        return handleAPICatchError(error);
    }
}
