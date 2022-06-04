import { getSession } from 'next-auth/react';
import { editForum } from '../../../lib/api/forum';

export default async function updateForum(req, res) {
    if (req.method !== 'POST') return res.status(401).end();
    const session = await getSession({ req });
    if (!session?.user?.role || session.user.role !== 'admin') return res.status(401).end();
    if (!req?.body?._id || !req?.body?.name) return res.status(400).end();
    const active = req.body.active ?? true;

    try {
        const response = await editForum(req.body._id, req.body.name, active);
        response?.code ? res.status(response.code).end() : res.status(500).end();
    } catch (error) {
        console.error(error);
        res.status(500).end();
    }
}
