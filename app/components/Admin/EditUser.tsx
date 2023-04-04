'use client';

import { AllUsersArray } from '@/types/index';

export default function EditUser({ usersData }: { usersData: AllUsersArray }) {
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
