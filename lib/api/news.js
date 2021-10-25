import formatDate from '../helpers/formatDate';

async function getNewsData(query) {
    if (!query) return null;
    const url = `${process.env.SANITY_PUBLIC_QUERY_URL}${query}`;
    const resJSON = await fetch(url).then(res => res.json().catch(error => console.log(error)));
    return resJSON?.result.map(res => {
        return {
            content: res.content,
            date: formatDate(res.date),
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
                date: formatDate(res.date),
                title: res.title,
            };
        }) || null,
    };
}

export async function getInitialNewsItems() {
    const query = encodeURIComponent('{"total": count(*[_type == "newsItem"]),"newsItems": *[_type == "newsItem"] | order(date desc, title asc) [0...10]{title, date, content}}');
    return getInitialNewsData(query);
}

export async function getMoreNewsItems(start) {
    const query = encodeURIComponent(`*[_type == "newsItem"] | order(date desc, title asc) [${start}...${start + 10}]{title, date, content}`);
    return getNewsData(query);
}

export async function getAllNewsItems() {
    const query = encodeURIComponent('*[_type == "newsItem"] | order(date desc, title asc) {title, date, content}');
    return getNewsData(query);
}
