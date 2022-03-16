import { getSession } from 'next-auth/react';
import { getForumTopic, getTopicReplies } from '../../../../../lib/api/forum';

export default async function forumTopic(req, res) {
    if (req.method === 'GET') {
        const session = await getSession({ req });
        if (!session) res.status(401).end();
        if (!req.query.forumId || !req.query.topicId) res.status(400).end();

        try {
            const topicData = await getForumTopic(parseInt(req.query.forumId), parseInt(req.query.topicId));

            let repliesData = [];
            if (topicData?.replies?.length > 0) {
                repliesData = await getTopicReplies(topicData.replies);
            }

            topicData ? res.status(200).json({ topicData, repliesData }) : res.status(400).end();
        } catch (error) {
            console.error(error);
            res.status(500).end();
        }
    } else {
        res.status(401).end();
    }
}
