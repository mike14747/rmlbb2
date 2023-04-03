import { getChampions } from '@/lib/api/champions';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import Spinner from '@/components/Spinner';

import styles from '@/styles/champions.module.css';

export const metadata: Metadata = {
    title: 'RML Baseball - Privacy Policy',
};

export const revalidate = 600;

export default async function Champions() {
    const championsData = await getChampions();

    return (
        <article className="mw-90ch">
            <h2 className="page-heading">
                Champions
            </h2>

            <Suspense fallback={<Spinner size="large" />}>
                {!championsData && <p className="error">An error occurred fetching data.</p>}

                {championsData?.length === 0 && <p>There are no champions to display. Check back again soon.</p>}

                {championsData?.length > 0 &&
                    <>
                        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
                        <table tabIndex={0} className="table table-bordered table-hover">
                            <thead>
                                <tr className={styles.headingRow}>
                                    <th>Year</th>
                                    <th className="text-left">Champion</th>
                                    <th className="text-left">Runner Up</th>
                                </tr>
                            </thead>
                            <tbody>
                                {championsData.map(c => (
                                    <tr key={c.year} className={styles.verticalMiddle}>
                                        <td className={styles.year}>
                                            {c.year}
                                        </td>
                                        <td className="text-left">
                                            <p className={styles.team + ' ' + styles.winner}>{c.championTeam}</p>
                                            {c.championManager &&
                                                <p className={styles.manager}>
                                                    {c.championManager}
                                                </p>
                                            }
                                        </td>
                                        <td className="text-left">
                                            <p className={styles.team + ' ' + styles.runnerUp}>{c.runnerUpTeam}</p>
                                            {c.runnerUpManager &&
                                                <p className={styles.manager}>
                                                    {c.runnerUpManager}
                                                </p>
                                            }
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                }
            </Suspense>
        </article >
    );
}
