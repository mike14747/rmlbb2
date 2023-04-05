import { PortableContentItem } from './sanity-types';

export type NewsItemsResultType = {
    result: {
        newsItems: Array<{
            _id: string;
            title: string;
            date: string;
            content: PortableContentItem[];
        }>,
        total?: number;
    }
}

export type NewsItemsType = {
    newsItems: {
        id: string;
        title: string;
        date: string | undefined;
        content: PortableContentItem[];
    }[];
    total: number | null;
} | null

// { total: number | null; newsItems: { id: string; content: PortableContentItem[]; date: string | undefined; title: string; }[]; } | null'

export type NewsItemProps = {
    initialNewsItems: NewsItemsType;
    numInitial: number;
    increment: number;
}
