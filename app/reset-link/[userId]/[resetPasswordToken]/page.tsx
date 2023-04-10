import type { Metadata } from 'next';
import { getServerSession } from 'next-auth/next';
import ResetPasswordToken from '@/components/ResetPasswordToken';
import Link from 'next/link';

import styles from '@/styles/profile.module.css';

export const metadata: Metadata = {
    title: 'Biking Log - Reset Password',
};

type PageProps = {
    params: {
        userId: string;
        resetPasswordToken: string;
    }
}

export default async function ResetPasswordTokenPage({ params }: PageProps) {
    const session = await getServerSession({
        callbacks: { session: ({ token }) => token },
    });

    const { userId, resetPasswordToken } = params;
    return (
        <main id="main">
            <article className="mw-75ch">
                <h2 className={'page-heading ' + styles.resetPageHeading}>
                    Reset your password
                </h2>

                {session &&
                    <p>
                        You are already logged in, so you cannot reset your password via the reset link. You must do it via your<> </>
                        <Link href="/profile">
                            profile
                        </Link>
                        .
                    </p>
                }

                {!session &&
                    <ResetPasswordToken userId={userId} resetPasswordToken={resetPasswordToken} />
                }
            </article>
        </main>
    );
}
