async function getData(query) {
    if (!query) return null;
    const url = `${process.env.NEXT_PUBLIC_BASEPUBLICQUERYURL}${query}`;
    const resJSON = await fetch(url).then(res => res.json().catch(error => console.log(error)));
    return resJSON?.result || null;
}

export async function getTopInfo() {
    const query = encodeURIComponent('*[_type == "topInfo"][0]{name, text, active}');
    return getData(query);
}
