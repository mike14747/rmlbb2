import { getSession } from 'next-auth/react';
import { addTopic } from '../../../../../lib/api/forum';

export default async function forumTopics(req, res) {
    const session = await getSession({ req });
    if (!session) res.status(401).end();
    if (!req.query.forumId) res.status(400).end();

    if (req.method === 'POST') {
        try {
            const response = await addTopic(session.user._id, session.user.name, req.query.forumId, req.body.title, req.body.content);
            response?.code ? res.status(response.code).end() : res.status(500).end();
        } catch (error) {
            res.status(500).end();
        }
    } else {
        res.status(401).end();
    }
}
