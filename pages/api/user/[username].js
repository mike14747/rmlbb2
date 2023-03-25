import { getToken } from 'next-auth/jwt';
import { getUserProfile } from '../../../lib/api/user';

export default async function user(req, res) {
    if (req.method !== 'GET') return res.status(401).end();
    const token = await getToken({ req });
    if (!token) return res.status(401).end();
    if (!req.query.username) return res.status(400).end();
    if (token?.name !== req.query.username) return res.status(401).end();

    try {
        const response = await getUserProfile(req.query.username);
        if (!response) return res.status(500).end();
        response?.length === 1 ? res.status(200).json(response) : res.status(400).end();
    } catch (error) {
        console.error(error);
        res.status(500).end();
    }
}
