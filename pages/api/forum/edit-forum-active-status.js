import { getSession } from 'next-auth/react';
import { editForumActiveStatus } from '../../../lib/api/forum';

export default async function forumActiveStatus(req, res) {
    const session = await getSession({ req });
    if (!session) res.status(401).end();
    if (!req?.body?.id) return res.status(400).end();

    if (req.method === 'POST') {
        try {
            const response = await editForumActiveStatus(req.body.id);
            response?.code ? res.status(response.code).end() : res.status(500).end();
        } catch (error) {
            console.error(error);
            res.status(500).end();
        }
    } else {
        res.status(401).end();
    }
}
