import { formatDateString } from '../helpers/formatDate';
import queryData from '../helpers/queryData';

const inc = parseInt(process.env.NEWS_ITEMS_INCREMENT);

async function getNewsData(query) {
    if (!query) return null;
    const url = `${process.env.SANITY_PUBLIC_QUERY_URL}${query}`;
    const resJSON = await fetch(url).then(res => res.json().catch(error => console.log(error)));
    return {
        total: resJSON?.result?.total || null,
        newsItems: resJSON?.result?.newsItems.map(res => {
            return {
                content: res.content,
                date: formatDateString(res.date, 'long'),
                title: res.title,
            };
        }) || null,
    };
}

export async function getNewsItems(start, num = inc) {
    const query = encodeURIComponent(`{"total": count(*[_type == "newsItem"]),"newsItems": *[_type == "newsItem"] | order(date desc, title asc) [${start}...${start + num}]{_id, title, date, content}}`);
    return getNewsData(query);
}

// this query isn't set correctly yet
export async function getNewsItemsFromSpecificYear(year) {
    const query = encodeURIComponent(`*[_type == "newsItem" && date > "${year - 1}-12-31" && date < "${year + 1}-01-01"] | order(date desc, title asc) {_id, title, date, content}`);
    return getNewsData(query);
}

export async function getAllNewsItems() {
    const query = encodeURIComponent('*[_type == "newsItem"] | order(date desc, title asc) {_id, title, date, content}');
    return getNewsData(query);
}

export async function getDistinctYears() {
    const query = encodeURIComponent('');
    return queryData(query);
}
