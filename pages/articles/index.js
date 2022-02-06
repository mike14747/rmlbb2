import PropTypes from 'prop-types';
import Head from 'next/head';
import Link from 'next/link';
import BlockContent from '@sanity/block-content-to-react';
import { getArticlesHomeText } from '../../lib/api/miscPortableText';
import serializers from '../../lib/serializers';
import { getActiveArticlesForIndex } from '../../lib/api/articles';
import SidebarCard from '../../components/SidebarCard';

import styles from '../../styles/article.module.css';

export default function Articles({ content, articlesList }) {
    return (
        <>
            <Head>
                <title>Articles Home</title>
            </Head>

            <div className={styles.articlePageContainer}>
                <article className={styles.articleContainer + ' mw-90ch'}>
                    <h2 className="page-heading">Articles Home</h2>

                    {!content?.content
                        ? <p className="error">An error occurred fetching data.</p>
                        : <BlockContent
                            blocks={content.content}
                            serializers={serializers}
                        />
                    }
                </article>

                <div className={styles.articleIndexContainer}>
                    <SidebarCard color="green" heading="Article Index" subheading="...enjoy the reads">
                        {articlesList?.length > 0
                            ? <>
                                {articlesList.map(article => (
                                    <p key={article.slug}>
                                        <Link href={'/articles/' + article.slug}>
                                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                            <a>
                                                {article.title}
                                            </a>
                                        </Link>
                                    </p>
                                ))}
                            </>
                            : <p className="error">There are no articles.Check back again soon.</p>
                        }
                    </SidebarCard>
                </div>
            </div>
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
