import PropTypes from 'prop-types';
import Head from 'next/head';
import BlockContent from '@sanity/block-content-to-react';
import noContainer from '../lib/noContainer';
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

            <article className={styles.recruitingContainer}>
                <h2 className="page-heading">
                    New Managers
                </h2>

                <BlockContent
                    blocks={content.content}
                    serializers={noContainer}
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
