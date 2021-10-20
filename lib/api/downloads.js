async function queryData(query) {
    if (!query) return null;
    const url = `${process.env.NEXT_PUBLIC_BASE_PUBLIC_QUERY_URL}${query}`;
    const dataJSON = await fetch(url).then(res => res.json().catch(error => console.log(error)));
    return dataJSON?.result[0] || null;
}

export async function getDownloadsList() {
    const query = encodeURIComponent(`*[ _type == "downloads"]
	    {files[active == true], lzps[active == true]}
        {
            "files": files[]{
                "key": _key,
                name,
                description,
                filename,
                "ref": file.asset._ref
            },
                "lzps": lzps[]{
                "key": _key,
                name,
                description,
                filename,
                "ref": file.asset._ref
            },
        }`);
    return queryData(query);
}

export async function getDownloadFile(ref) {
    if (!ref) return null;
    const file = await fetch(`${process.env.NEXT_PUBLIC_BASE_DOWNLOAD_URL}${ref.split('-').slice(1).join('.')}`);
    return file;
}