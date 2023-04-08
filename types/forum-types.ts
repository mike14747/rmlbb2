export type ForumList = {
    _id: number;
    name: string;
    topics: number;
    posts: number;
    lastPost?: {
        topicId: number;
        replyId: number;
        subject: string;
        username: string;
        userId: number;
        date: Date;
        dateStr?: string
    };
    lastPostDaysAgo?: number;
}

type ForumTopicBase = {
    _id: number;
    title: string;
    content: string;
    forumId: number;
    forumName: string;
    user_id: number;
    username: string;
    views: number;
    replies: number[];
    lastReply?: {
        replyId: number;
        subject: string;
        username: string;
        userId: number;
    };
}

export type ForumTopicFromDB = ForumTopicBase & {
    date: Date;
    lastEditDate: Date | null;
    lastReply?: {
        date: Date;
    };
}

export type ForumTopicToClient = ForumTopicBase & {
    dateStr: string | undefined;
    lastEditDateStr: string | undefined;
    lastReply?: {
        dateStr: string | undefined;
    };
}

export type ForumTopics = {
    _id: number;
    title: string;
    user_id: number;
    username: string;
    date: Date;
    views: number;
    lastReply?: {
        replyId: number;
        subject: string;
        username: string;
        userId: number;
        date: Date;
        dateStr?: string
    };
    forumName: string;
    replies: number[];
    dateStr?: string;
}

export type RecentPost = {
    title: string;
    content: string;
    forumName: string;
    username: string;
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
