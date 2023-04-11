// import { getToken } from 'next-auth/jwt';
// import { addTopic } from '../../../../../../lib/api/forum';

// export default async function addNewTopic(req, res) {
//     if (req.method !== 'POST') return res.status(401).end();
//     const token = await getToken({ req });
//     if (!token) return res.status(401).end();
//     if (!req.query.forumId) return res.status(400).end();

//     try {
//         const response = await addTopic(token.id, token.name, parseInt(req.query.forumId), req.body.title, req.body.content);
//         response?.code ? res.status(response.code).end() : res.status(500).end();
//     } catch (error) {
//         res.status(500).end();
//     }
// }

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
