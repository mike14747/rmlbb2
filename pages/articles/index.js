import PropTypes from 'prop-types';
import Head from 'next/head';
import Link from 'next/link';
import BlockContent from '@sanity/block-content-to-react';
import { getArticlesHomeText } from '../../lib/api/miscPortableText';
import serializers from '../../lib/serializers';
import { getActiveArticlesForIndex } from '../../lib/api/articles';

export default function Articles({ content, articlesList }) {
    return (
        <>
            <Head>
                <title>Articles Home</title>
            </Head>

            <article>
                <h2 className="page-heading">Articles Home</h2>

                {!content?.content
                    ? <p className="error">An error occurred fetching data.</p>
                    : <BlockContent
                        blocks={content.content}
                        serializers={serializers}
                    />
                }
            </article>

            <section>
                <h5>Article Index</h5>

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
                    : <p className="error">There are no articles. Check back again soon.</p>
                }
            </section>
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
