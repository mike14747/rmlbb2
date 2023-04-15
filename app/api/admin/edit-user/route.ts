import { NextRequest, NextResponse } from 'next/server';
// import { editUser } from '@/lib/api/user';
import { getToken } from 'next-auth/jwt';
import { handleAPICatchError } from '@/lib/helpers/handleCatchErrors';

export async function PUT(request: NextRequest) {
    try {
        const token = await getToken({ req: request });
        if (token?.role !== 'admin') return NextResponse.json(null, { status: 401 });

        // const { username, password, email, active } = await request.json();
        // if (!username || !password || !email) return NextResponse.json(null, { status: 400 });

        // const result = await editUser(username, password, email, active);
        // return result?.code ? NextResponse.json(null, { status: result.code }) : NextResponse.json(null, { status: 500 });
        return NextResponse.json(null, { status: 500 });
    } catch (error) {
        return handleAPICatchError(error);
    }
}
