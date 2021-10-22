import queryData from '../helpers/queryData';

export async function getSettings() {
    const query = encodeURIComponent(`*[_type == 'settings' && name == 'Site Settings'][0]{
        contactEmail,
        topInfoText,
        topInfoActive,
        links,
    }`);
    return queryData(query);
}
