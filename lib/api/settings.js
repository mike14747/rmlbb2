import { basePublicQueryUrl } from '../../lib/settings';

async function getData(query) {
    if (!query) return null;
    const url = `${basePublicQueryUrl}${query}`;
    const resJSON = await fetch(url).then(res => res.json().catch(error => console.log(error)));
    return resJSON?.result || null;
}

export async function getAllSettings() {
    const query = encodeURIComponent('*[_type == "settings"]{name, value}');
    return getData(query);
}
