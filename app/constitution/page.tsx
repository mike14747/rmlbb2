import { PortableText } from '@portabletext/react';
import { getConstitutionContent } from '@/lib/api/miscPortableText';
import components from '@/lib/helpers/portableTextComponents';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import Spinner from '@/components/Spinner';

import styles from '@/styles/constitution.module.css';
import blockContentStyles from '@/styles/blockContent.module.css';

export const revalidate = 600;

export const metadata: Metadata = {
    title: 'RML Baseball - Constitution',
};

export default async function Constitution() {
    const res = await getConstitutionContent();

    return (
        <main id="main">
            <article className={styles.constitutionContainer + ' mw-90ch ' + blockContentStyles.blockContentContainer}>
                <h2 className="page-heading">
                    Constitution
                </h2>

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
