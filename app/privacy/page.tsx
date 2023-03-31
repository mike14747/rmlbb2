import { PortableText } from '@portabletext/react';
import { getPrivacyPolicyText } from '../../lib/api/miscPortableText';
import serializers from '../../lib/serializers';
import type { Metadata } from 'next';

import styles from '../../styles/privacy.module.css';

export const metadata: Metadata = {
    title: 'RML Baseball - Privacy Policy',
};

export default async function Privacy() {
    const content = await getPrivacyPolicyText();

    return (
        <article className={styles.privacyContainer + ' mw-90ch'}>
            <h2 className="page-heading">
                Privacy Policy
            </h2>

            {!content.content && <p className="error">An error occurred fetching data.</p>}

            {content.content &&
                <PortableText
                    value={content.content}
                    components={serializers}
                />
            }
        </article>
    );
}
