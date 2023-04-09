// // import { changeAllPasswords } from '../../lib/api/user';

// export default async function changePasswords(req, res) {
//     return res.status(401).end();

//     // await changeAllPasswords()
//     //     .then((response) => res.status(200).json(response))
//     //     .catch((error) => console.log(error.message) || res.status(500).end());
// }

import { NextRequest, NextResponse } from 'next/server';
// import { changeAllPasswords } from '@/lib/api/user';
import { getToken } from 'next-auth/jwt';
import { handleAPICatchError } from '@/lib/helpers/handleCatchErrors';

export async function POST(request: NextRequest) {
    try {
        const token = await getToken({ req: request });
        if (token?.role !== 'admin') return NextResponse.json({ error: 'You need to be logged in with the role of admin to access this route.' }, { status: 401 });

        // const result = await changeAllPasswords();
        // return result ? NextResponse.json(result, { status: 200 }) : NextResponse.json(null, { status: 500 });

        return NextResponse.json(null, { status: 401 });
    } catch (error) {
        return handleAPICatchError(error);
    }
}
