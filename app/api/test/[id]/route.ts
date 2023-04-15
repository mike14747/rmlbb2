import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { id: string }}) {
    const { id } = params;
    const { searchParams } = request.nextUrl;
    const status = searchParams.get('status');
    return NextResponse.json({ msg: 'Hello ' + id + '! Status is: ' + status + '.' });
}
