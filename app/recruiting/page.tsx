import { PortableText } from '@portabletext/react';
import components from '@/lib/helpers/portableTextComponents';
import { getRecruitingContent } from '@/lib/api/miscPortableText';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import Spinner from '@/components/Spinner';

import styles from '@/styles/recruiting.module.css';

export const metadata: Metadata = {
    title: 'RML Baseball - New Managers',
};

export default async function Recruiting() {
    const res = await getRecruitingContent();

    return (
        <main id="main">
            <article className={styles.recruitingContainer + ' mw-90ch'}>
                <h1 className="page-heading">
                    New Managers
                </h1>

                <Suspense fallback={<Spinner size="large" />}>
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
        </main>
    );
}
