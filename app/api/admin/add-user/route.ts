import { NextRequest, NextResponse } from 'next/server';
import { addUser } from '@/lib/api/user';
import { getToken } from 'next-auth/jwt';
import { handleAPICatchError } from '@/lib/helpers/handleCatchErrors';

export async function POST(request: NextRequest) {
    try {
        const token = await getToken({ req: request });
        if (token?.role !== 'admin') return NextResponse.json({ error: 'You need to be logged in with the role of admin to access this route.' }, { status: 401 });

        const { username, password, email, active } = await request.json();
        if (!username || !password || !email) return NextResponse.json(null, { status: 400 });

        const result = await addUser(username, password, email, active);
        return result?.code ? NextResponse.json(null, { status: result.code }) : NextResponse.json(null, { status: 500 });
    } catch (error) {
        return handleAPICatchError(error);
    }
}
