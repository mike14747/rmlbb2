async function getMiscPortableText(query) {
    if (!query) return null;
    const url = `${process.env.NEXT_PUBLIC_BASEPUBLICQUERYURL}${query}`;
    const resJSON = await fetch(url).then(res => res.json().catch(error => console.log(error)));
    return resJSON?.result || null;
}

export async function getRecruitingContent() {
    const query = encodeURIComponent('*[_type == "miscPortableText" && title == "Recruiting" && active == true][0]{content}');
    return getMiscPortableText(query);
}

export async function getConstitutionContent() {
    const query = encodeURIComponent('*[_type == "miscPortableText" && title == "Constitution" && active == true][0]{content}');
    return getMiscPortableText(query);
}
