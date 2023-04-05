import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import CurrentProfile from '@/components/Profile/CurrentProfile';
import { getUserProfile } from '@/lib/api/user';
import { UserInfo } from '@/types/user-types';

export const metadata: Metadata = {
    title: 'RML Baseball - Profile',
};

export default async function Profile() {
    const session = await getServerSession({
        callbacks: { session: ({ token }) => token },
    });

    if (!session) {
        redirect('/login?callbackUrl=/profile');
    }

    const user = await getUserProfile(parseInt(session.id));

    if (!user) return <p className="error">An error occurred fetching user profile info.</p>;

    const userObj: UserInfo = {
        id: session.id,
        username: user.username,
        email: user.email,
        registeredDateStr: user.registeredDateStr,
    };

    return (
        <main id="main">
            <article className="mw-75ch">
                <h2 className="page-heading">
                    Profile
                </h2>

                {user
                    ? <CurrentProfile userObj={userObj} />
                    : <p className="error">An error occurred fetching user profile info.</p>
                }
            </article>
        </main>
    );
}
