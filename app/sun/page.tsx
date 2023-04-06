import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import SunEditorComp from '@/components/Sun/SunEditor';

// import styles from '../../../styles/forum.module.css';

export const metadata: Metadata = {
    title: 'RML Baseball - Sun text editor testing',
};

export default async function Sun() {
    const session = await getServerSession({
        callbacks: { session: ({ token }) => token },
    });

    if (!session) {
        redirect('/login?callbackUrl=/profile');
    }

    return (
        <article className="mw-90ch">
            <h2 className="page-heading">
                Sun Editor
            </h2>

            <SunEditorComp />
        </article>
    );
}

// SunEditor seems to have a bug which yields this error in dev mode: "Uncaught TypeError: this._resourcesStateChange is not a function"
// their github discussion says it works in production mode and by turning off strict mode, though I haven't tested it yet.
