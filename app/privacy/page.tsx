import { PortableText } from '@portabletext/react';
import { getPrivacyPolicyText } from '@/lib/api/miscPortableText';
import components from '@/lib/helpers/portableTextComponents';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import Spinner from '@/components/Spinner';

import styles from '@/styles/privacy.module.css';

export const revalidate = 600;

export const metadata: Metadata = {
    title: 'RML Baseball - Privacy Policy',
};

export default async function Privacy() {
    const privacyData = await getPrivacyPolicyText();

    return (
        <main id="main">
            <article className={styles.privacyContainer + ' mw-90ch'}>
                <h2 className="page-heading">
                    Privacy Policy
                </h2>

                <Suspense fallback={<Spinner size="large" />}>
                    {!privacyData && <p className="error">An error occurred fetching data.</p>}

                    {privacyData?.content && privacyData.content.length < 1 && <p>No content was found. Please try again later.</p>}

                    {privacyData?.content && privacyData.content.length > 1 &&
                        <PortableText
                            value={privacyData.content}
                            components={components}
                        />
                    }
                </Suspense>
            </article>
        </main>
    );
}
