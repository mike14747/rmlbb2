import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { changePassword } from '@/lib/api/user';
import { handleAPICatchError } from '@/lib/helpers/handleCatchErrors';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const token = await getToken({ req: request });

        const { userId, password, resetPasswordToken } = await request.json();
        const { id } = await params;
        if (!id || !password) return NextResponse.json(null, { status: 400 });

        if (token && token.id === id) {
            const result = await changePassword(parseInt(id), password);
            return result?.code ? NextResponse.json(null, { status: result.code }) : NextResponse.json(null, { status: 500 });
        }

        if (userId && resetPasswordToken) {
            const result = await changePassword(parseInt(userId), password, resetPasswordToken);
            return result?.code ? NextResponse.json(null, { status: result.code }) : NextResponse.json(null, { status: 500 });
        }

        return NextResponse.json(null, { status: 400 });
    } catch (error) {
        return handleAPICatchError(error);
    }
}
