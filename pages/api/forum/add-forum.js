import { getSession } from 'next-auth/react';
import { addForum } from '../../../lib/api/forum';

export default async function addNewForum(req, res) {
    if (req.method !== 'POST') return res.status(401).end();
    const session = await getSession({ req });
    if (!session?.user?.role || session.user.role !== 'admin') return res.status(401).end();
    if (!req?.body?.name) return res.status(400).end();

    try {
        const response = await addForum(req.body.name, req.body?.active);
        response?.code ? res.status(response.code).end() : res.status(500).end();
    } catch (error) {
        console.error(error);
        res.status(500).end();
    }
}
