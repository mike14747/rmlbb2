import { DownloadFile } from '@/types/index';

export type UserSignin = {
    _id: number;
    username: string;
    password: string;
    salt: string;
    role: string;
}

export type UserProfile = {
    id?: string;
    username: string;
    email: string;
    registeredDate: Date;
    registeredDateStr?: string;
}

// this is the type that gets output from the getAllUsers serverless function to the client... after it's been modified from the AllUsersItem type
export type AllUsersItemPost = {
    _id: string;
    username: string;
    email: string;
    registeredDateStr: string | undefined;
    active: boolean;
}

// this is the type for the query that comes back from the database on the getAllUsers serverless function... before it gets modified to be ouput to the client
export type AllUsersItem = AllUsersItemPost & {
    registeredDate?: Date;
}

export type TokenValid = {
    id: number;
    resetPasswordExpires: Date;
}

export type ForumList = {
    _id: number;
    name: string;
    topics: number;
    posts: number;
    lastPost: { date: Date; dateStr?: string };
    lastPostDaysAgo?: number;
}

export type ForumTopics = {
    _id: number;
    title: string;
    user_id: number;
    username: string;
    date: Date;
    views: number;
    lastReply: { date: Date; dateStr?: string };
    forumName: string;
    replies: number;
    dateStr?: string;
}

export type RecentPost = {
    title: string;
    content: string;
    forumName: string;
    username: string;
    date: Date;
    dateStr?: string;
}

export type TopicReplyData = {
    _id: number;
    subject: string;
    content: string;
    forum_id: number;
    forumName: string;
    forumActive: boolean;
    user_id: number;
    username: string;
    topic_id: number;
    topicActive: boolean;
    date: Date;
    dateStr?: string
    lastEditDate: Date;
    lastEditDateStr?: string;
}

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

export type EventItem = {
    details: string;
    event: string;
    eventDate: string;
    eventDateStr: string | null;
    daysUntil: number;
}

export type SingleArticle = {
    title: string;
    content: PortableContentItem[];
}

export type ActiveArticleIndex = {
    title: string;
    slug: string;
}

export type Champions = {
    year: number;
    championTeam: string;
    championManager: string;
    runnerUpTeam: string;
    runnerUpManager: string;
}

export type DownloadsList = {
    files: DownloadFile[];
    lzps: DownloadFile[];
}
