import { PortableContentItem } from './sanity-types';

export type SingleArticle = {
    title: string;
    content: PortableContentItem[];
}

export type ActiveArticleIndex = {
    title: string;
    slug: string;
}
