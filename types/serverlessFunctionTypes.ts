export type UserSignin = {
    _id: number;
    username: string;
    password: string;
    salt: string;
    role: string;
}

export type UserProfile = {
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
    lastPost: { date: Date; lastDate?: string };
    lastPostDaysAgo?: number;
}

export type ForumTopics = {
    _id: number;
    title: string;
    user_id: number;
    username: string;
    date: Date;
    views: number;
    lastReply: { date: Date; lastDate?: string };
    forumName: string;
    replies: number;
    lastDate?: string;
}

export type RecentPost = {
    title: string;
    content: string;
    forumName: string;
    username: string;
    date: Date;
    lastDate?: string;
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
    lastDate?: string
    lastEditDate: Date;
    lastEditDateStr?: string;
}

export type NewsItemsType = {
    result: {
        newsItems: Array<{
            _id: number;
            title: string;
            date: string;
            content: string;
        }>,
        total?: number;
    }
}

export type EventsArr = {
    details: string;
    event: string;
    eventDate: string;
}
