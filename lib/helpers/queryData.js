export default async function queryData(query) {
    if (!query) return null;
    const url = `${process.env.SANITY_PUBLIC_QUERY_URL}${query}`;
    const dataJSON = await fetch(url).then(res => res.json().catch(error => console.log(error)));
    return dataJSON?.result || null;
}
