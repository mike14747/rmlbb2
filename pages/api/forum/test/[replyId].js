import { getSession } from 'next-auth/react';
import { getOneReply } from '../../../../lib/api/forum';

export default async function getReplyById(req, res) {
    if (req.method !== 'GET') return res.status(401).end();
    const session = await getSession({ req });
    if (!session) return res.status(401).end();
    if (!req.query.replyId) return res.status(400).end();

    try {
        const response = await getOneReply(parseInt(req.query.replyId));
        response ? res.status(200).json(response) : res.status(500).end();
    } catch (error) {
        console.error(error);
        res.status(500).end();
    }
}
