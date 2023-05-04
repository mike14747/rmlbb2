import { getArticleBySlug, getActiveArticleSlugs } from '@/lib/api/articles';
import { PortableText } from '@portabletext/react';
import components from '@/lib/helpers/portableTextComponents';
import { Suspense } from 'react';
import Spinner from '@/components/Spinner';

import styles from '@/styles/article.module.css';
import blockContentStyles from '@/styles/blockContent.module.css';

export async function generateStaticParams() {
    return await getActiveArticleSlugs();
}

export default async function Article({ params }: { params: { slug: string } }) {
    const articleData = await getArticleBySlug(params.slug);

    return (
        <main id="main">
            <article className={styles.articleContainer + ' mw-90ch ' + blockContentStyles.blockContentContainer}>
                <Suspense fallback={<Spinner size="large" />}>
                    {!articleData && <p className="error">An error occurred fetching data.</p>}

                    {articleData.title &&
                        <h2 className="page-heading">{articleData.title}</h2>
                    }

                    {articleData.content && articleData.content.length < 1 && <p>No content was found. Please try again later.</p>}

                    {articleData.content && articleData.content.length > 1 &&
                        <PortableText
                            value={articleData.content}
                            components={components}
                        />
                    }
                </Suspense>
            </article>
        </main>
    );
}
