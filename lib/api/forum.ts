import clientPromise from '../mongodb';
import { formatDateObjectWithTime } from '../helpers/formatDate';
import { getNextId } from '../helpers/getNextMongoId';
import { ForumList, ForumTopicFromDB, ForumTopicToClient, RecentPost, TopicReplyData } from '@/types/forum-types';
import { TransactionOptions, ReadPreference } from 'mongodb';

export async function getForumList() {
    try {
        const connection = await clientPromise;
        const db = connection.db();

        const data = (await db
            .collection('forums')
            .find({ active: true })
            .project({ _id: 1, name: 1, topics: 1, posts: 1, lastPost: 1 })
            .sort({ order: 1 })
            .toArray()) as ForumList[];

        data.forEach(forum => {
            if (forum.lastPost && forum.lastPostDaysAgo) {
                forum.lastPostDaysAgo = forum.lastPost.date ? Math.floor((+new Date() - +forum.lastPost.date) / (1000 * 60 * 60 * 24)) : undefined;
                forum.lastPost.dateStr = forum.lastPost.date ? formatDateObjectWithTime(forum.lastPost.date, 'short') : undefined;
            }
        });
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getForumListForEdit() {
    try {
        const connection = await clientPromise;
        const db = connection.db();

        const data = (await db
            .collection('forums')
            .find()
            .project({ _id: 1, name: 1, active: 1, order: 1 })
            .sort({ order: 1 })
            .toArray()) as ForumList[];

        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getMostRecentPostsForHomepage() {
    try {
        const connection = await clientPromise;
        const db = connection.db();

        const data = (await db
            .collection('topics').aggregate([
                {
                    '$match': {
                        'active': true,
                        'forumActive': true,
                    },
                },
                {
                    '$project': {
                        'title': 1,
                        'content': 1,
                        'forumName': 1,
                        'username': 1,
                        'date': 1,
                    },
                },
                {
                    '$sort': {
                        'date': -1,
                    },
                },
                {
                    '$limit': 5,
                },
                {
                    '$unionWith': {
                        'coll': 'replies',
                        'pipeline': [
                            {
                                '$match': {
                                    'topicActive': true,
                                    'forumActive': true,
                                },
                            }, {
                                '$project': {
                                    'title': '$subject',
                                    'content': 1,
                                    'forumName': 1,
                                    'username': 1,
                                    'date': 1,
                                },
                            }, {
                                '$sort': {
                                    'date': -1,
                                },
                            }, {
                                '$limit': 5,
                            },
                        ],
                    },
                },
                {
                    $project: {
                        _id: 0,
                    },
                },
                {
                    '$sort': {
                        'date': -1,
                    },
                },
                {
                    '$limit': 5,
                },
            ])
            .map(topic => {
                topic.content = topic.content.replace(/(<([^>]+)>)/ig, '').substring(0, 60);
                topic.dateStr = formatDateObjectWithTime(topic.date, 'short');
                delete topic.date;
                return topic;
            })
            .toArray()) as RecentPost[];

        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getActiveForumTopics(forumId: number) {
    try {
        const connection = await clientPromise;
        const db = connection.db();

        const data = (await db
            .collection('topics').aggregate([
                {
                    $match: {
                        active: true,
                        forumActive: true,
                        forum_id: forumId,
                    },
                },
                {
                    $addFields: {
                        lastDate: {
                            $cond: {
                                if: { $gt: ['$lastReply.date', null] },
                                then: '$lastReply.date',
                                else: '$date',
                            },
                        },
                    },
                },
                {
                    $project: {
                        _id: 1,
                        title: 1,
                        user_id: 1,
                        username: 1,
                        date: 1,
                        views: 1,
                        lastReply: 1,
                        forum_id: 1,
                        forumName: 1,
                        replies: 1,
                        lastDate: 1,
                    },
                },
                {
                    $sort: {
                        lastDate: -1,
                    },
                },
            ])
            .map(topic => {
                topic.dateStr = formatDateObjectWithTime(topic.date, 'short');
                delete topic.date;
                topic.lastEditDateStr = topic.lastEditDate ? formatDateObjectWithTime(topic.lastEditDate, 'short') : undefined;
                delete topic.lastEditDate;

                if (topic.lastReply) {
                    topic.lastReply.dateStr = formatDateObjectWithTime(topic.lastReply.date, 'short');
                    delete topic.lastReply.date;
                }

                return topic;
            })
            .toArray()) as ForumTopicToClient[];

        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getActiveForumTopic(forumId: number, topicId: number) {
    try {
        const connection = await clientPromise;
        const db = connection.db();

        const data = await db
            .collection('topics')
            .findOne<ForumTopicFromDB>({ forum_id: forumId, _id: topicId, forumActive: true, active: true }, { projection: { forumActive: 0, active: 0 } });

        if (!data) return null;

        const dataFormatted: ForumTopicToClient = {
            _id: data._id,
            title: data.title,
            content: data.content,
            forum_id: data.forum_id,
            forumName: data.forumName,
            user_id: data.user_id,
            username: data.username,
            dateStr: formatDateObjectWithTime(data.date, 'short'),
            lastEditDateStr: data.lastEditDate ? formatDateObjectWithTime(data.lastEditDate, 'short') : undefined,
            views: data.views,
            replies: data.replies,
            ...(data.lastReply
                ? {
                    lastReply: {
                        replyId: data.lastReply.replyId,
                        subject: data.lastReply.subject,
                        username: data.lastReply.username,
                        userId: data.lastReply.userId,
                        dateStr: formatDateObjectWithTime(data.lastReply.date, 'short'),
                    },
                }
                : { lastReply: undefined }),
        };

        return dataFormatted;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getTopicReplies(repliesArr: number[]) {
    try {
        const connection = await clientPromise;
        const db = connection.db();

        const data = (await db
            .collection('replies')
            .find({ _id: { $in: repliesArr } })
            .map(reply => {
                reply.dateStr = formatDateObjectWithTime(reply.date, 'short');
                delete reply.date;
                reply.lastEditDateStr = reply.lastEditDate ? formatDateObjectWithTime(reply.lastEditDate, 'short') : undefined;
                delete reply.lastEditDate;
                return reply;
            })
            .toArray()) as unknown as TopicReplyData[];
        // the "as unknown" was needed to be done because the type I've set was conflicting with WithId<Document>... which was invoked by mongodb because _id was used in a search inside an array

        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getForumName(forumId: number) {
    try {
        const connection = await clientPromise;
        const db = connection.db();

        const data = await db
            .collection('forums')
            .findOne({ active: true, _id: forumId }, { projection: { _id: 0, name: 1 } });

        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function addForum(name: string, active = true) {
    if (!name) return { code: 400 };

    try {
        const connection = await clientPromise;
        const db = connection.db();

        const inUseResult = await db
            .collection('forums')
            .find({ name: name })
            .project({ _id: 0, name: 1 })
            .limit(1)
            .toArray();

        if (!inUseResult) return { code: 500 };
        if (inUseResult.length > 0) return { code: 409 };

        // at this point, the new forum name is not already in use, so get the next _id from the counters collection
        const nextId = await getNextId('forum_id');
        if (!nextId) return { code: 500 };

        const newForum = {
            _id: nextId,
            name,
            active,
            order: 20,
            topics: 0,
            posts: 0,
            lastPost: {},
        };

        const result = await db
            .collection('forums')
            .insertOne(newForum);

        return result?.insertedId ? { code: 201 } : { code: 500 };
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function editForum(_id: number, newForumName: string, newActiveStatus: boolean) {
    const connection = await clientPromise;
    const db = connection.db();

    // make sure newForumName is not already in use
    const inUseResult = await db
        .collection('forums')
        .find({ _id: { $ne: _id }, name: newForumName })
        .project({ _id: 1 })
        .limit(1)
        .toArray();
    if (!inUseResult) return { code: 500 };
    if (inUseResult.length === 1) return { code: 409 };

    // update the forum name (and all references to it in other colections) with newForumName using a tranaction
    const session = connection.startSession();

    let transactionResult;

    const transactionOptions: TransactionOptions = {
        readConcern: { level: 'local' },
        writeConcern: { w: 'majority' },
        readPreference: ReadPreference.primary,
    };

    try {
        transactionResult = await session.withTransaction(async () => {
            await db
                .collection('forums')
                .updateOne({ _id: _id }, { $set: { name: newForumName, active: newActiveStatus } }, { session });

            await db
                .collection('topics')
                .updateMany({ forum_id: _id }, { $set: { forumName: newForumName, forumActive: newActiveStatus } }, { session });

            await db
                .collection('replies')
                .updateMany({ forum_id: _id }, { $set: { forumName: newForumName, forumActive: newActiveStatus } }, { session });
        }, transactionOptions);
    } catch (error) {
        console.log(error);
    } finally {
        await session.endSession();
    }

    return transactionResult?.ok === 1 ? { code: 200 } : { code: 500 };
}

export async function addTopic(userId: number, username: string, forumId: number, forumName: string, title: string, content: string) {
    if (!userId || !username || !forumId || !forumName || !title || !content) return { code: 400 };

    const connection = await clientPromise;
    const db = connection.db();

    // get the next _id from the counters collection
    const nextId = await getNextId('topic_id');
    if (!nextId) return { code: 500 };

    const currentDate = new Date();

    const newTopic = {
        _id: nextId,
        title,
        content,
        forum_id: forumId,
        forumName,
        user_id: userId,
        username,
        date: currentDate,
        lastEditDate: null,
        views: 0,
        replies: [],
        forumActive: true,
        active: true,
        lastReply: {},
    };

    const lastPost = {
        topicId: nextId,
        replyId: null,
        subject: title,
        userId,
        username,
        date: currentDate,
    };

    // add a new topic and update the forum's lastTopic object to include it using a tranaction
    const session = connection.startSession();

    let transactionResult;

    const transactionOptions: TransactionOptions = {
        readConcern: { level: 'local' },
        writeConcern: { w: 'majority' },
        readPreference: ReadPreference.primary,
    };

    try {
        transactionResult = await session.withTransaction(async () => {
            await db
                .collection('topics')
                .insertOne(newTopic, { session });

            await db
                .collection('forums')
                .updateOne({ _id: forumId }, { $set: { lastPost: lastPost } }, { session });

        }, transactionOptions);
    } catch (error) {
        console.log(error);
    } finally {
        await session.endSession();
    }

    return transactionResult?.ok === 1 ? { code: 201 } : { code: 500 };
}

export async function editTopic(topicId: number, userId: number, title: string, content: string) {
    if (!topicId || !userId || !title || !content) return { code: 400 };

    const connection = await clientPromise;
    const db = connection.db();

    const currentDate = new Date();

    // add a new topic and update the forum's lastTopic object to include it using a tranaction
    const session = connection.startSession();

    let transactionResult;

    const transactionOptions: TransactionOptions = {
        readConcern: { level: 'local' },
        writeConcern: { w: 'majority' },
        readPreference: ReadPreference.primary,
    };

    try {
        transactionResult = await session.withTransaction(async () => {
            await db
                .collection('topics')
                .updateOne({ _id: topicId, user_id: userId }, { $set: { title, content, lastEditDate: currentDate } }, { session });

            await db
                .collection('forums')
                .updateOne({ 'lastPost.topicId': topicId, 'lastPost.replyId': null, 'lastPost.userId': userId }, { $set: { lastPost: { subject: title, content } } }, { session });

        }, transactionOptions);
    } catch (error) {
        console.log(error);
    } finally {
        await session.endSession();
    }

    return transactionResult?.ok === 1 ? { code: 200 } : { code: 500 };
}

export async function getOneReply(replyId: number) {
    try {
        const connection = await clientPromise;
        const db = connection.db();

        const data = await db
            .collection('replies')
            .findOne({ _id: replyId }, { projection: { subject: 1, content: 1 } });

        return data;
    } catch (error) {
        console.log(error);
        return null;
    }

}

// try {
//     const connection = await clientPromise;
//     const db = connection.db();

// } catch (error) {
//     console.log(error);
//     return null;
// }
