import { getSession } from 'next-auth/react';
import { addTopic } from '../../../../../lib/api/forum';

export default async function addNewTopic(req, res) {
    if (req.method !== 'POST') return res.status(401).end();
    const session = await getSession({ req });
    if (!session) return res.status(401).end();
    if (!req.query.forumId) return res.status(400).end();

    try {
        const response = await addTopic(session.user._id, session.user.name, parseInt(req.query.forumId), req.body.title, req.body.content);
        response?.code ? res.status(response.code).end() : res.status(500).end();
    } catch (error) {
        res.status(500).end();
    }
}
