import { getToken } from 'next-auth/jwt';
import { getForumList } from '../../../lib/api/forum';

export default async function forumList(req, res) {
    if (req.method !== 'GET') return res.status(401).end();
    const token = await getToken({ req });
    if (!token) return res.status(401).end();

    try {
        const response = await getForumList();
        response ? res.status(200).json(response) : res.status(500).end();
    } catch (error) {
        console.error(error);
        res.status(500).end();
    }
}
