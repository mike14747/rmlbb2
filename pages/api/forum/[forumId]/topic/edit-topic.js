import { getSession } from 'next-auth/react';
import { editTopic } from '../../../../../lib/api/forum';

export default async function editExistingTopic(req, res) {
    const session = await getSession({ req });
    if (!session) res.status(401).end();
    if (!req.query.forumId || !req.query.topicId) res.status(400).end();

    if (req.method === 'POST') {
        try {
            const response = await editTopic(parseInt(req.query.topicId), session.user._id, req.body.title, req.body.content);
            response?.code ? res.status(response.code).end() : res.status(500).end();
        } catch (error) {
            res.status(500).end();
        }
    } else {
        res.status(401).end();
    }
}
