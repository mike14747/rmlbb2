import { getToken } from 'next-auth/jwt';
import { editForum } from '../../../lib/api/forum';

export default async function updateForum(req, res) {
    if (req.method !== 'POST') return res.status(401).end();
    const token = await getToken({ req });
    if (!token?.role || token.role !== 'admin') return res.status(401).end();
    if (!req?.body?.name) return res.status(400).end();
    const active = req.body.active ?? true;

    try {
        const response = await editForum(req.body._id, req.body.name, active);
        response?.code ? res.status(response.code).end() : res.status(500).end();
    } catch (error) {
        console.error(error);
        res.status(500).end();
    }
}
