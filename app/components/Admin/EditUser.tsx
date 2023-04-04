'use client';

// import { AllUsersItem } from '@/types/index';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function EditUser({ usersData }: any) {
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
