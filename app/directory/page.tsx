import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { Suspense } from 'react';
import Spinner from '@/components/Spinner';
import ManagerCard from '@/components/ManagerCard';
import { getManagers } from '@/lib/api/directory';

import styles from '@/styles/directory.module.css';

export const metadata: Metadata = {
    title: 'RML Baseball - Manager Directory',
};

function selectConference(conf: 'American' | 'National') {
    return /^american|national$/i.test(conf) ? conf.toLowerCase() : 'notSpecified';
}

export default async function Directory() {
    const session = await getServerSession({
        callbacks: { session: ({ token }) => token },
    });

    console.log({ session });

    if (!session) {
        redirect('/login?callbackUrl=/directory');
    }

    const managersData = await getManagers();

    return (
        <main id="main">
            <article>
                <h2 className="page-heading">
                    Manager Directory
                </h2>

                <Suspense fallback={<Spinner size="large" />}>
                    {managersData && managersData?.length > 0
                        ? <div className={styles.directoryContainer}>
                            {managersData.map(conf => (
                                <div key={conf.conference} className={styles.conferenceContainer}>
                                    <h3 className={`${styles.conferenceHeading} ${styles[selectConference(conf.conference) + 'Heading']}`}>
                                        {conf.conference} Conference
                                    </h3>
                                    {conf.divisions.map(div => (
                                        <div key={div.division} className={styles.divisionContainer}>
                                            <h4 className={styles.divisionHeading}>
                                                <span className={styles.divisionPrefix}>Division: </span> {div.division}
                                            </h4>
                                            {div.teams.map(team => (
                                                <ManagerCard key={team.team} manager={team} />
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                        : <p className="error">No manager information is available. Please try back again soon.</p>
                    }
                </Suspense>
            </article>
        </main >
    );
}
