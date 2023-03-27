import queryData from '../helpers/queryData';

export async function getActiveArticlesForIndex() {
    const query = encodeURIComponent('*[ _type == "article" && active == true] | {title, "slug": slug.current}');
    return queryData(query);
}

export async function getArticleBySlug(slug: string) {
    console.log('slug:', slug);
    const query = encodeURIComponent(`*[ _type == "article" && active == true && slug.current == "${slug}"][0]{title, slug, content}`);
    return queryData(query);
}

export async function getActiveArticleSlugs() {
    const query = encodeURIComponent('*[ _type == "article" && active == true] | {"slug": slug.current}');
    return queryData(query);
}
