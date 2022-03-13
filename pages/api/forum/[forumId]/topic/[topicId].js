import { getSession } from 'next-auth/react';
import { getForumTopic } from '../../../../../lib/api/forum';

export default async function forumTopic(req, res) {
    if (req.method === 'GET') {
        const session = await getSession({ req });
        if (!session) res.status(401).end();
        if (!req.query.forumId || !req.query.topicId) res.status(400).end();

        try {
            const response = await getForumTopic(parseInt(req.query.forumId), parseInt(req.query.topicId));
            response ? res.status(200).json(response) : res.status(400).end();
        } catch (error) {
            console.error(error);
            res.status(500).end();
        }
    } else {
        res.status(401).end();
    }
}
