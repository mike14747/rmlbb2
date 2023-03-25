import { getToken } from 'next-auth/jwt';
import { getForumTopics } from '../../../../lib/api/forum';

export default async function forumTopics(req, res) {
    if (req.method !== 'GET') return res.status(401).end();
    const token = await getToken({ req });
    if (!token) return res.status(401).end();
    if (!req.query.forumId) return res.status(400).end();

    try {
        const response = await getForumTopics(parseInt(req.query.forumId));
        response ? res.status(200).json(response) : res.status(500).end();
    } catch (error) {
        console.error(error);
        res.status(500).end();
    }
}
