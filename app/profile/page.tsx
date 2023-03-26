import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
// eslint-disable-next-line camelcase
import { getServerSession } from 'next-auth/next';
import CurrentProfile from '../components/Profile/CurrentProfile';
import { getUserProfile } from '../../lib/api/user';

export const metadata: Metadata = {
    title: 'RML Baseball - Profile',
};

async function getData(id: number) {
    const data = await getUserProfile(id).catch(error => console.log(error.message));
    if (!data) return null;
    return JSON.parse(JSON.stringify(data));
}

export default async function Profile() {
    const session = await getServerSession({
        callbacks: { session: ({ token }) => token },
    });

    if (!session) {
        redirect('/login?callbackUrl=/profile');
    }

    const user = await getData(parseInt(session.id)).catch(error => console.log(error.message));
    if (user?.username && user?.email) user.id = session.id;

    return (
        <main id="main">
            <article className="mw-75ch">
                <h2 className="page-heading">
                    Profile
                </h2>

                {user
                    ? <CurrentProfile userObj={user} />
                    : <p className="error">An error occurred fetching user profile info.</p>
                }
            </article>
        </main>
    );
}
