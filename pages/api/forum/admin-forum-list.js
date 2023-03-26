import { getToken } from 'next-auth/jwt';
import { getForumListForEdit } from '../../../lib/api/forum';

export default async function adminForumList(req, res) {
    if (req.method !== 'GET') return res.status(401).end();
    const token = await getToken({ req });
    if (!token?.role || token.role !== 'admin') return res.status(401).end();
    if (!req?.body?.name) return res.status(400).end();

    try {
        const response = await getForumListForEdit();
        response ? res.status(200).json(response) : res.status(500).end();
    } catch (error) {
        console.error(error);
        res.status(500).end();
    }
}
