import PropTypes from 'prop-types';
import Head from 'next/head';
import { getDownloads } from '../lib/api/downloads';
import DownloadType from '../components/DownloadType';

import styles from '../styles/downloads.module.css';

const Downloads = ({ downloads }) => {
    // console.log('downloads:', downloads);
    console.log('download files:', downloads.files);
    console.log('download lzps:', downloads.lzps);
    return (
        <>
            <Head>
                <title>
                    RML Baseball - Downloads
                </title>
            </Head>

            <article>
                <h2 className="page-heading">
                    Downloads
                </h2>

                {(!downloads?.files || !downloads?.lzps) && <p className={styles.error}>An error occurred fetching data.</p>}

                {downloads.files?.length === 0 &&
                    <p>There are no file downloads to display. Check back again soon.</p>
                }

                {downloads.lzps?.length === 0 &&
                    <p>There are no lzp downloads to display. Check back again soon.</p>
                }

                <div className={styles.wrapper}>
                    {downloads.files?.length > 0 && <DownloadType downloads={downloads.files} label="File Downloads" />}

                    {downloads.lzps?.length > 0 && <DownloadType downloads={downloads.lzps} label="LZP Downloads" />}
                </div>

            </article>
        </>
    );
};

Downloads.propTypes = {
    downloads: PropTypes.object,
};

export async function getStaticProps() {
    const downloads = await getDownloads();

    return {
        props: { downloads },
        revalidate: 600, // page regeneration can occur in 10 minutes
    };
}

export default Downloads;

// https://cdn.sanity.io/files/tmt0dwwl/production/b4dad8ec532c2a58a874d041542837c61fec24e7.xlsx
// file-b4dad8ec532c2a58a874d041542837c61fec24e7-xlsx
//  return `https://cdn.sanity.io/files/${PROJECT_ID}/${DATASET}/${id}.${extension}`
// file.asset._ref.split('-').slice(1).join(".")
