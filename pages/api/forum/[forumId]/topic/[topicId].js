import { getToken } from 'next-auth/jwt';
import { getForumTopic, getTopicReplies } from '../../../../../lib/api/forum';

function setRepliesArr(page, arr) {
    let repliesStartIndex = 0;
    let repliesEndIndex = 24;
    if (page && page >= 2) {
        repliesStartIndex = (page - 1) * 24;
        repliesEndIndex = 25 + ((page - 1) * 24);
    }
    const newRepliesArr = arr.slice(repliesStartIndex, repliesEndIndex);
    return newRepliesArr;
}

export default async function forumTopic(req, res) {
    if (req.method !== 'GET') return res.status(401).end();
    const token = await getToken({ req });
    if (!token) return res.status(401).end();
    if (!req.query.forumId || !req.query.topicId) return res.status(400).end();

    const page = parseInt(req.query?.page) || undefined;

    try {
        const topicData = await getForumTopic(parseInt(req.query.forumId), parseInt(req.query.topicId));

        let repliesData = [];
        if (topicData?.replies?.length > 0) {
            repliesData = await getTopicReplies(setRepliesArr(page, topicData?.replies));
        }

        topicData ? res.status(200).json({ topicData, repliesData }) : res.status(400).end();
    } catch (error) {
        console.error(error);
        res.status(500).end();
    }
}
