import queryData from '../helpers/queryData';

export async function getAllArticlesForIndex() {
    const query = encodeURIComponent('*[ _type == "article" && active == true] | {title, slug}');
    return queryData(query);
}

export async function getArticleBySlug(slug) {
    const query = encodeURIComponent(`*[ _type == "article" && active == true && slug == ${slug}] | {title, slug, content}`);
    return queryData(query);
}
