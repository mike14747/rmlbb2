import PropTypes from 'prop-types';
import Head from 'next/head';
import { getChampions } from '../lib/api/champions';

import styles from '../styles/champions.module.css';

const Champions = ({ champions }) => {
    return (
        <>
            <Head>
                <title>
                    RML Baseball - Champions
                </title>
            </Head>

            <article>
                <h2 className="page-heading">
                    Champions
                </h2>

                {!champions && <p className={styles.error}>An error occurred fetching data.</p>}

                {champions?.length === 0 &&
                    <p>There are no champions to display. Check back again soon.</p>
                }

                {champions?.length > 0 &&
                    <>
                        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
                        <table tabIndex="0" className="table table-bordered table-hover">
                            <thead>
                                <tr className={styles.headingRow}>
                                    <th>Year</th>
                                    <th className="text-left">Champion</th>
                                    <th className="text-left">Runner Up</th>
                                </tr>
                            </thead>
                            <tbody>
                                {champions.map(c => (
                                    <tr key={c.year} className={styles.verticalMiddle}>
                                        <td className={styles.year}>
                                            {c.year}
                                        </td>
                                        <td className="text-left">
                                            <p className={styles.team + ' ' + styles.winner}>{c.championTeam}</p>
                                            {c.championManager &&
                                                <p className={styles.manager}>
                                                    ({c.championManager})
                                                </p>
                                            }
                                        </td>
                                        <td className="text-left">
                                            <p className={styles.team + ' ' + styles.runnerUp}>{c.runnerUpTeam}</p>
                                            {c.runnerUpManager &&
                                                <p className={styles.manager}>
                                                    ({c.runnerUpManager})
                                                </p>
                                            }
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                }
            </article>
        </>
    );
};

Champions.propTypes = {
    champions: PropTypes.array,
};

export async function getStaticProps() {
    const champions = await getChampions();

    return {
        props: { champions },
        revalidate: 600, // page regeneration can occur in 10 minutes
    };
}

export default Champions;
