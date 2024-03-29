import { NextRequest, NextResponse } from 'next/server';
import { addForum } from '@/lib/api/forum';
import { getToken } from 'next-auth/jwt';
import { handleAPICatchError } from '@/lib/helpers/handleCatchErrors';

export async function POST(request: NextRequest) {
    try {
        const token = await getToken({ req: request });
        if (!token) return NextResponse.json(null, { status: 401 });
        if (token.role !== 'admin') return NextResponse.json(null, { status: 403 });

        const { name, active } = await request.json();
        if (!name) return NextResponse.json(null, { status: 400 });

        const result = await addForum(name, active);
        return result?.code ? NextResponse.json(null, { status: result.code }) : NextResponse.json(null, { status: 500 });
    } catch (error) {
        return handleAPICatchError(error);
    }
}
