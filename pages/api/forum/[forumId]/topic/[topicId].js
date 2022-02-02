import { getSession } from 'next-auth/react';
import { getForumTopic } from '../../../../../lib/api/forum';

export default async function forumTopic(req, res) {
    if (req.method === 'GET') {
        const session = await getSession({ req });
        if (!session) res.status(401).end();

        try {
            const response = await getForumTopic();
            response ? res.status(200).json(response) : res.status(500).end();
        } catch (error) {
            console.error(error);
            res.status(500).end();
        }
    } else {
        res.status(401).end();
    }
}
