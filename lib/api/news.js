import { formatDate } from '../helpers/formatDate';

async function getNewsData(query) {
    if (!query) return null;
    const url = `${process.env.NEXT_PUBLIC_BASE_PUBLIC_QUERY_URL}${query}`;
    const resJSON = await fetch(url).then(res => res.json().catch(error => console.log(error)));
    return resJSON?.result.map(res => {
        return {
            content: res.content,
            date: formatDate(res.date),
            title: res.title,
        };
    }) || null;
}

export async function getSomeNewsItems(range) {
    const query = encodeURIComponent('*[_type == "newsItem"]{title, date, content}[0...10] | order(date desc)');
    return getNewsData(query);
}

export async function getAllNewsItems() {
    const query = encodeURIComponent('*[_type == "newsItem"]{title, date, content} | order(date desc)');
    return getNewsData(query);
}
