import { getSession } from 'next-auth/react';
import { changeUsername } from '../../../lib/api/user';

export default async function updateUsername(req, res) {
    if (req.method !== 'POST') res.status(401).end();
    const session = await getSession({ req });
    if (!session) res.status(401).end();
    if (!req?.body?.newUsername) return res.status(400).end();

    try {
        const response = await changeUsername(session.user._id, req.body.newUsername);
        response?.code ? res.status(response.code).end() : res.status(500).end();
    } catch (error) {
        res.status(500).end();
    }
}
