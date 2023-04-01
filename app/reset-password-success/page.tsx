import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'RML Baseball - Reset Password Success',
};

export default function ResetPasswordSuccess() {
    return (
        <main id="main">
            <p className='reset-password-success'>You have successfully updated your password!</p>
        </main>
    );
}
