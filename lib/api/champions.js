async function queryData(query) {
    if (!query) return null;
    const url = `${process.env.NEXT_PUBLIC_BASEPUBLICQUERYURL}${query}`;
    const dataJSON = await fetch(url).then(res => res.json().catch(error => console.log(error)));
    return dataJSON?.result || null;
}

export async function getChampions() {
    const query = encodeURIComponent('*[ _type == "champion"] | order(year asc){year, championTeam, championManager, runnerUpTeam, runnerUpManager}');
    return queryData(query);
}
