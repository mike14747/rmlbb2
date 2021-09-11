async function getMiscPortableText(query) {
    if (!query) return null;
    const url = `${process.env.NEXT_PUBLIC_BASEPUBLICQUERYURL}${query}`;
    const resJSON = await fetch(url).then(res => res.json().catch(error => console.log(error)));
    return resJSON?.result || null;
}

export async function getNewManagerContent() {
    const query = encodeURIComponent('*[_type == "miscPortableText" && active == true][0]{content}');
    return getMiscPortableText(query);
}
