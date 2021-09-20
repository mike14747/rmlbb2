import { groupManagers } from '../groupManagers';

async function queryData(query) {
    if (!query) return null;
    const url = `${process.env.NEXT_PUBLIC_BASEPUBLICQUERYURL}${query}`;
    const dataJSON = await fetch(url).then(res => res.json().catch(error => console.log(error)));
    // console.log('query result in serverless function:', dataJSON?.result);
    return dataJSON?.result || null;
}

export async function getManagers() {
    const query = encodeURIComponent('*[ _type == "manager"]{team, conference, division} | order(team asc)');
    const rawData = await queryData(query);
    return groupManagers(rawData);
}
