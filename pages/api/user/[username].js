import { getSession } from 'next-auth/react';
import { getUserProfile } from '../../../lib/api/user';

export default async function user(req, res) {
    const session = await getSession({ req });
    if (!session) res.status(401).end();
    if (!req.query.username) res.status(400).end();
    if (session.user?.name !== req.query.username) res.status(401).end();

    if (req.method === 'GET') {
        try {
            const response = await getUserProfile(req.query.username);
            if (!response) res.status(500).end();
            response?.length === 1 ? res.status(200).json(response) : res.status(400).end();
        } catch (error) {
            console.error(error);
            res.status(500).end();
        }
    }
}
