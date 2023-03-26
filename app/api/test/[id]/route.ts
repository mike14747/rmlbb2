import { NextRequest, NextResponse } from 'next/server';

type IdParams = {
    params: {
        id: string;
    }
}

export async function GET(request: NextRequest, { params }: IdParams) {
    const id = params.id;
    const { searchParams } = request.nextUrl;
    const status = searchParams.get('status');
    return NextResponse.json({ msg: 'Hello ' + id + '! Status is: ' + status + '.' });
}
