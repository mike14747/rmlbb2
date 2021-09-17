async function getData(query) {
    if (!query) return null;
    const url = `${process.env.NEXT_PUBLIC_BASEPUBLICQUERYURL}${query}`;
    const resJSON = await fetch(url).then(res => res.json().catch(error => console.log(error)));
    return resJSON?.result || null;
}

export async function getSettings() {
    const query = encodeURIComponent(`*[_type == 'settings' && name == 'Main'][0]{
        contactEmail,
        topInfoText,
        topInfoActive,
        'links': links[]->{
            name,
            url
          }
    }`);
    return getData(query);
}