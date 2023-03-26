import { groupManagers } from '../helpers/groupManagers';

async function queryData(query) {
    if (!query) return null;

    const url = `${process.env.SANITY_PRIVATE_QUERY_URL}${query}`;
    const dataJSON = await fetch(url, {
        method: 'get',
        headers: {
            Authorization: 'Bearer ' + process.env.SANITY_API_TOKEN,
        },
    }).then(res => res.json()).catch(error => console.log(error));

    return dataJSON?.result || null;
}

export async function getManagers() {
    const query = encodeURIComponent('*[ _type == "manager"] | order(team asc)');
    return groupManagers(await queryData(query));
}
