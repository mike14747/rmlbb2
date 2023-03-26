import { getToken } from 'next-auth/jwt';
import { changeUsername } from '../../../lib/api/user';

export default async function updateUsername(req, res) {
    if (req.method !== 'POST') return res.status(401).end();
    const token = await getToken({ req });
    if (!token) return res.status(401).end();
    if (!req?.body?.username) return res.status(400).end();

    try {
        const response = await changeUsername(parseInt(token.id), req.body.username);
        response?.code ? res.status(response.code).end() : res.status(500).end();
    } catch (error) {
        console.error(error);
        res.status(500).end();
    }
}
