import { formatDateString } from '../helpers/formatDate';

async function getNewsData(query) {
    if (!query) return null;
    const url = `${process.env.SANITY_PUBLIC_QUERY_URL}${query}`;
    const resJSON = await fetch(url).then(res => res.json().catch(error => console.log(error)));
    return resJSON?.result.map(res => {
        return {
            content: res.content,
            date: formatDateString(res.date, 'long'),
            title: res.title,
        };
    }) || null;
}

async function getInitialNewsData(query) {
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

export async function getInitialNewsItems(num = 20) {
    const query = encodeURIComponent(`{"total": count(*[_type == "newsItem"]),"newsItems": *[_type == "newsItem"] | order(date desc, title asc) [0...${num}]{_id, title, date, content}}`);
    return getInitialNewsData(query);
}

export async function getMoreNewsItems(start, num = 20) {
    const query = encodeURIComponent(`*[_type == "newsItem"] | order(date desc, title asc) [${start}...${start + num}]{_id, title, date, content}`);
    return getNewsData(query);
}

// this query isn't set correctly yet
// export async function getNewsItemsFromSpecificYear(year) {
//     const query = encodeURIComponent('*[_type == "newsItem"] | order(date desc, title asc) {_id, title, date, content}');
//     return getNewsData(query);
// }

export async function getAllNewsItems() {
    const query = encodeURIComponent('*[_type == "newsItem"] | order(date desc, title asc) {_id, title, date, content}');
    return getNewsData(query);
}
