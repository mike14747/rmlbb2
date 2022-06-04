import { getSession } from 'next-auth/react';
import { getForumName } from '../../../../lib/api/forum';

export default async function forumList(req, res) {
    if (req.method !== 'GET') return res.status(401).end();
    const session = await getSession({ req });
    if (!session) return res.status(401).end();
    if (!req.query.forumId) return res.status(400).end();

    try {
        const response = await getForumName(parseInt(req.query.forumId));
        response ? res.status(200).json(response) : res.status(500).end();
    } catch (error) {
        console.error(error);
        res.status(500).end();
    }
}
