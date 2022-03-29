import { getSession } from 'next-auth/react';
import { editForumName } from '../../../lib/api/forum';

export default async function newForumName(req, res) {
    const session = await getSession({ req });
    if (!session?.user?.role || session.user.role !== 'admin') res.status(401).end();
    if (!req?.body?.id || !req?.body?.name) return res.status(400).end();

    if (req.method === 'POST') {
        try {
            const response = await editForumName(req.body.id, req.body.name);
            response?.code ? res.status(response.code).end() : res.status(500).end();
        } catch (error) {
            console.error(error);
            res.status(500).end();
        }
    } else {
        res.status(401).end();
    }
}
