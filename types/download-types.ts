export type DownloadFile = {
    key: string;
    name: string;
    description: string | null;
    filename: string;
    ref: string;
}

export type DownloadsList = {
    files: DownloadFile[];
    lzps: DownloadFile[];
}
