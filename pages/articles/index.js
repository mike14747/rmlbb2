import PropTypes from 'prop-types';
import Head from 'next/head';
import BlockContent from '@sanity/block-content-to-react';
import { getArticlesHomeText } from '../../lib/api/miscPortableText';
import serializers from '../../lib/serializers';
import { getActiveArticlesForIndex } from '../../lib/api/articles';
import ArticleIndex from '../../components/ArticleIndex';

import styles from '../../styles/article.module.css';

export default function Articles({ content, articlesList }) {
    return (
        <>
            <Head>
                <title>Articles Home</title>
            </Head>

            <article className={styles.articleContainer}>
                <h2 className="page-heading">Articles Home</h2>

                {!content?.content
                    ? <p className="error">An error occurred fetching data.</p>
                    : <BlockContent
                        blocks={content.content}
                        serializers={serializers}
                    />
                }
            </article>

            <ArticleIndex links={articlesList} />
        </>
    );
}

Articles.propTypes = {
    content: PropTypes.object,
    articlesList: PropTypes.array,
};

export async function getStaticProps() {
    const content = await getArticlesHomeText();
    const articlesList = await getActiveArticlesForIndex();

    return {
        props: { content, articlesList },
        revalidate: 600, // page regeneration can occur in 10 minutes
    };
}
