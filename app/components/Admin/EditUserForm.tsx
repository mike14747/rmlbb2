'use client';

import { AllUsersDateStr } from '@/types/user-types';

export default function EditUserForm({ usersData }: { usersData: AllUsersDateStr[] | null }) {
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
