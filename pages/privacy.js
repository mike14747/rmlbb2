import PropTypes from 'prop-types';
import Head from 'next/head';
import BlockContent from '@sanity/block-content-to-react';
import { getPrivacyPolicyText } from '../lib/api/miscPortableText';
import serializers from '../lib/serializers';

import styles from '../styles/privacy.module.css';

export default function Privacy({ content }) {
    return (
        <>
            <Head>
                <title>
                    RML Baseball - Privacy Policy
                </title>
            </Head>

            <article className={styles.privacyContainer + ' mw-90ch'}>
                <h2 className="page-heading">
                    Privacy Policy
                </h2>

                {!content?.content
                    ? <p className="error">An error occurred fetching data.</p>
                    : <BlockContent
                        blocks={content.content}
                        serializers={serializers}
                    />
                }
            </article>
        </>
    );
}

Privacy.propTypes = {
    content: PropTypes.object,
};

export async function getStaticProps() {
    const content = await getPrivacyPolicyText();

    return {
        props: { content },
        revalidate: 600, // page regeneration can occur in 10 minutes
    };
}
