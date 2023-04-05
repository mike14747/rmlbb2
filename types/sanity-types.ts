export type PortableContentItem = {
    _key: string;
        _type: string
        children: Array<{
            _key: string;
            _type: string;
            marks: Array<string>
            text: string;
        }>;
        markDefs: Array<string>;
        style: string;
}

export type PortableContent = {
    content: Array<PortableContentItem>;
}
