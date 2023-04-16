import type { Metadata } from 'next';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import components from '@/lib/helpers/portalTextComponents';
import { getArticlesHomeText } from '@/lib/api/miscPortableText';
import { getActiveArticlesForIndex } from '@/lib/api/articles';
import SidebarCard from '@/components/SidebarCard';
import { Suspense } from 'react';
import Spinner from '@/components/Spinner';

import styles from '@/styles/article.module.css';

export const revalidate = 600;

export const metadata: Metadata = {
    title: 'RML Baseball - Articles Home',
};

export default async function Articles() {
    const articleHomeData = await getArticlesHomeText();
    const articlesList = await getActiveArticlesForIndex();

    return (
        <main id="main">
            <div className={styles.articlePageContainer}>
                <article className={styles.articleContainer + ' mw-90ch'}>
                    <h2 className="page-heading">Articles Home</h2>

                    <Suspense fallback={<Spinner size="large" />}>
                        {!articleHomeData?.content
                            ? <p className="error">An error occurred fetching data.</p>
                            : <PortableText
                                value={articleHomeData.content}
                                components={components}
                            />
                        }
                    </Suspense>
                </article>

                <div className={styles.articleIndexContainer}>
                    <SidebarCard color="green" heading="Article Index" subheading="...enjoy the reads">
                        <Suspense fallback={<Spinner size="large" />}>
                            {articlesList?.length === 0 && <p className="error">There are no articles.Check back again soon.</p>}

                            {articlesList?.length > 0 &&
                                <>
                                    {articlesList.map(article => (
                                        <p key={article.slug}>
                                            <Link href={'/articles/' + article.slug}>
                                                {article.title}
                                            </Link>
                                        </p>
                                    ))}
                                </>
                            }
                        </Suspense>
                    </SidebarCard>
                </div>
            </div>
        </main>
    );
}
