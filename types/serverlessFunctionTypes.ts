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
