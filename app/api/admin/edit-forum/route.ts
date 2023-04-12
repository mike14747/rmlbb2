import { NextRequest, NextResponse } from 'next/server';
import { editForum } from '@/lib/api/forum';
import { getToken } from 'next-auth/jwt';
import { handleAPICatchError } from '@/lib/helpers/handleCatchErrors';

export async function PUT(request: NextRequest) {
    try {
        const token = await getToken({ req: request });
        if (token?.role !== 'admin') return NextResponse.json({ error: 'You need to be logged in with the role of admin to access this route.' }, { status: 401 });

        const { id, name, order, active } = await request.json();
        if (!id || !name) return NextResponse.json(null, { status: 400 });

        const result = await editForum(id, name, order, active);
        return result?.code ? NextResponse.json(null, { status: result.code }) : NextResponse.json(null, { status: 500 });
    } catch (error) {
        return handleAPICatchError(error);
    }
}
