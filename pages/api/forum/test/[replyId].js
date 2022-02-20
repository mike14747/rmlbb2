import { getSession } from 'next-auth/react';
import { getOneReply } from '../../../../lib/api/forum';

export default async function getReplyById(req, res) {
    const session = await getSession({ req });
    if (!session) res.status(401).end();
    if (!req.query.replyId) res.status(400).end();

    if (req.method === 'GET') {
        try {
            const response = await getOneReply(req.query.replyId);
            response ? res.status(200).json(response) : res.status(500).end();
        } catch (error) {
            console.error(error);
            res.status(500).end();
        }
    } else {
        res.status(401).end();
    }
}
