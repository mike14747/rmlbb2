import PropTypes from 'prop-types';
import Head from 'next/head';
import BlockContent from '@sanity/block-content-to-react';
import serializers from '../lib/serializers';
import { getRecruitingContent } from '../lib/api/miscPortableText';

import styles from '../styles/recruiting.module.css';

const Recruiting = ({ content }) => {
    return (
        <>
            <Head>
                <title>
                    New Managers
                </title>
            </Head>

            <article className={styles.recruitingContainer + ' mw-90ch'}>
                <h2 className="page-heading">
                    New Managers
                </h2>

                {!content && <p className="error">An error occurred fetching data.</p>}

                <BlockContent
                    blocks={content.content}
                    serializers={serializers}
                />
            </article>
        </>
    );
};

Recruiting.propTypes = {
    content: PropTypes.object,
};

export async function getStaticProps() {
    const content = await getRecruitingContent();

    return {
        props: { content },
        revalidate: 600, // page regeneration can occur in 10 minutes
    };
}

export default Recruiting;
