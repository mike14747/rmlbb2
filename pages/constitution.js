import PropTypes from 'prop-types';
import Head from 'next/head';
import BlockContent from '@sanity/block-content-to-react';
import noContainer from '../lib/noContainer';
import { getConstitutionContent } from '../lib/api/miscPortableText';

import styles from '../styles/Constitution.module.css';

const Constitution = ({ content }) => {
    return (
        <>
            <Head>
                <title>
                    RML Baseball - Constitution
                </title>
            </Head>

            <article className={styles.constitutionContainer}>
                <h2 className="page-heading">
                    Constitution
                </h2>

                <BlockContent
                    blocks={content.content}
                    serializers={noContainer}
                />
            </article>
        </>
    );
};

Constitution.propTypes = {
    content: PropTypes.object,
};

export async function getStaticProps() {
    const content = await getConstitutionContent();

    return {
        props: { content },
        revalidate: 600, // page regeneration can occur in 10 minutes
    };
}

export default Constitution;
