import { PortableText } from '@portabletext/react';
import { getPrivacyPolicyText } from '../../lib/api/miscPortableText';
import components from '../../lib/helpers/portalTextComponents';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import Spinner from '../components/Spinner';

import styles from '../../styles/privacy.module.css';

export const metadata: Metadata = {
    title: 'RML Baseball - Privacy Policy',
};

export default async function Privacy() {
    const res = await getPrivacyPolicyText();

    return (
        <article className={styles.privacyContainer + ' mw-90ch'}>
            <h2 className="page-heading">
                Privacy Policy
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
