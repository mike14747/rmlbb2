import queryData from '../helpers/queryData';

import { SingleArticle, ActiveArticleIndex } from '@/types/article-types';

export async function getActiveArticlesForIndex() {
    const query = encodeURIComponent('*[ _type == "article" && active == true] | {title, "slug": slug.current}');
    const articleIndexData: Promise<ActiveArticleIndex[]> = await queryData(query);
    return articleIndexData;
}

export async function getArticleBySlug(slug: string) {
    const query = encodeURIComponent(`*[ _type == "article" && active == true && slug.current == "${slug}"][0]{title, slug, content}`);
    const article: Promise<SingleArticle> = await queryData(query);
    return article;
}

export async function getActiveArticleSlugs() {
    const query = encodeURIComponent('*[ _type == "article" && active == true] | {"slug": slug.current}');
    const slugList: Promise<{ slug: string }[]> = await queryData(query);
    return slugList;
}
