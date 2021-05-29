import { basePublicQueryUrl } from '../../lib/settings';

export async function getSomeNewsItems(range) {

}

export async function getAllNewsItems() {
    const query = encodeURIComponent('*[_type == "newsItem"]{title, date, content} | order(date desc)');
    const url = `${basePublicQueryUrl}${query}`;
    const newsJSON = await fetch(url).then(res => res.json().catch(error => console.log(error)));
    return newsJSON?.result || [];
}
