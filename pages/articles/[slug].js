import PropTypes from 'prop-types';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getArticleBySlug, getActiveArticleSlugs } from '../../lib/api/articles';
import Loading from '../../components/Loading';
import BlockContent from '@sanity/block-content-to-react';
import serializers from '../../lib/serializers';

export default function Article({ article, slugs }) {
    const router = useRouter();

    if (router.isFallback) {
        return (
            <Loading />
        );
    }
    return (
        <>
            <Head>
                <title>Articles</title>
            </Head>

            <article>
                {!article?.content
                    ? <p className="error">An error occurred fetching data.</p>
                    : <>
                        <h2 className="page-heading">{article?.title}</h2>

                        <BlockContent
                            blocks={article.content}
                            serializers={serializers}
                        />
                    </>
                }
            </article>
        </>
    );
}

Article.propTypes = {
    article: PropTypes.object,
    slugs: PropTypes.array,
};

export async function getStaticPaths() {
    const slugListResponse = await getActiveArticleSlugs();
    const slugListJSON = JSON.parse(JSON.stringify(slugListResponse)) || [];
    const paths = slugListJSON.map(item => {
        return { params: { slug: item.slug } };
    });

    return {
        paths,
        fallback: true,
    };
}

export async function getStaticProps({ params }) {
    const article = await getArticleBySlug(params.slug);

    return {
        props: { article },
        revalidate: 600, // page regeneration can occur in 10 minutes
    };
}
