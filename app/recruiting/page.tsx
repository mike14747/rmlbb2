import { PortableText } from '@portabletext/react';
import components from '../../lib/helpers/portalTextComponents';
import { getRecruitingContent } from '../../lib/api/miscPortableText';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import Spinner from '../components/Spinner';

import styles from '../../styles/recruiting.module.css';

export const metadata: Metadata = {
    title: 'RML Baseball - New Managers',
};

export default async function Recruiting() {
    const res = await getRecruitingContent();

    return (
        <article className={styles.recruitingContainer + ' mw-90ch'}>
            <h2 className="page-heading">
                New Managers
            </h2>

            <Suspense fallback={<Spinner />}>
                {!res && <p className="error">An error occurred fetching data.</p>}

                {res?.content && res.content.length < 1 && <p>No content was found. Please try again later.</p>}

                {res?.content && res.content.length > 1 &&
                    <PortableText
                        value={res.content}
                        components={components}
                    />
                }
            </Suspense>
        </article>
    );
}
