import { basePublicQueryUrl } from '../../lib/settings';

async function getNewsData(query) {
    if (!query) return null;
    const url = `${basePublicQueryUrl}${query}`;
    const newsJSON = await fetch(url).then(res => res.json().catch(error => console.log(error)));
    return newsJSON?.result || null;
}

export async function getSomeNewsItems(range) {
    const query = encodeURIComponent('*[_type == "newsItem"]{title, date, content}[0...10] | order(date desc)');
    return getNewsData(query);
}

export async function getAllNewsItems() {
    const query = encodeURIComponent('*[_type == "newsItem"]{title, date, content} | order(date desc)');
    return getNewsData(query);
}
