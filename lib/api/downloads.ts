import { DownloadsList } from '@/types/download-types';

async function queryDownloadsData(query: string): Promise<DownloadsList | null> {
    if (!query) return null;
    const url = `${process.env.NEXT_PUBLIC_BASE_FILE_QUERY_URL}${query}`;
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
    return queryDownloadsData(query);
}
