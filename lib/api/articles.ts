import queryData from '../helpers/queryData';

import * as sft from '../../types/serverlessFunctionTypes';

export async function getActiveArticlesForIndex() {
    const query = encodeURIComponent('*[ _type == "article" && active == true] | {title, "slug": slug.current}');
    const articleIndexData: Promise<sft.ActiveArticleIndex[]> = await queryData(query);
    return articleIndexData;
}

export async function getArticleBySlug(slug: string) {
    const query = encodeURIComponent(`*[ _type == "article" && active == true && slug.current == "${slug}"][0]{title, slug, content}`);
    const article: Promise<sft.SingleArticle> = await queryData(query);
    return article;
}

export async function getActiveArticleSlugs() {
    const query = encodeURIComponent('*[ _type == "article" && active == true] | {"slug": slug.current}');
    const slugList: Promise<{ slug: string }[]> = await queryData(query);
    return slugList;
}
