import PropTypes from 'prop-types';
import Head from 'next/head';
import BlockContent from '@sanity/block-content-to-react';
import { getConstitutionContent } from '../lib/api/miscPortableText';

import styles from '../styles/constitution.module.css';

const small = (props) => {
    return <span style={{ fontSize: '75%' }}>{props.children}</span>;
};

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
                    // eslint-disable-next-line react/display-name
                    serializers={{ container: props => <>{props.children}</>, marks: { small } }}
                // serializers={noContainer}
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
