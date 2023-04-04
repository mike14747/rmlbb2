'use client';

import { AllUsers } from '@/types/index';

export default function EditUser({ usersData }: { usersData: AllUsers[] | null }) {
    console.log({ usersData });
    return (
        <>
            <p>This is the EditUser component.</p>

            <pre>
                {JSON.stringify(usersData, null, '  ')}
            </pre>
        </>
    );
}
