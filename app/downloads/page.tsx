import type { Metadata } from 'next';
import { getDownloadsList } from '@/lib/api/downloads';
import DownloadType from '@/components/DownloadType';
import { Suspense } from 'react';
import Spinner from '@/components/Spinner';

import styles from '@/styles/downloads.module.css';

export const revalidate = 60;

export const metadata: Metadata = {
    title: 'RML Baseball - Downloads',
};

export default async function DownloadsPage() {
    const downloadsData = await getDownloadsList();

    return (
        <article>
            <h2 className="page-heading">
                Downloads
            </h2>

            {!downloadsData && <p className={styles.error}>An error occurred fetching data.</p>}

            <div className={styles.wrapper}>
                <Suspense fallback={<Spinner size="large" />}>
                    <DownloadType downloads={downloadsData?.files || []} label="Regular Downloads" />
                </Suspense>

                <Suspense fallback={<Spinner size="large" />}>
                    <DownloadType downloads={downloadsData?.lzps || []} label="LZP Downloads" />
                </Suspense>
            </div>
        </article>
    );
}
