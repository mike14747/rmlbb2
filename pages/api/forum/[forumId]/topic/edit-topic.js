import { getToken } from 'next-auth/jwt';
import { editTopic } from '../../../../../lib/api/forum';

export default async function editExistingTopic(req, res) {
    if (req.method !== 'POST') return res.status(401).end();
    const token = await getToken({ req });
    if (!token) return res.status(401).end();
    if (!req.query.forumId || !req.query.topicId) return res.status(400).end();

    try {
        const response = await editTopic(parseInt(req.query.topicId), token.id, req.body.title, req.body.content);
        response?.code ? res.status(response.code).end() : res.status(500).end();
    } catch (error) {
        res.status(500).end();
    }
}
