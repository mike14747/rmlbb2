import { getSession } from 'next-auth/react';
import { changeEmail } from '../../../lib/api/user';

export default async function updateEmail(req, res) {
    if (req.method !== 'POST') return res.status(401).end();
    const session = await getSession({ req });
    if (!session) return res.status(401).end();
    if (!req?.body?.email) return res.status(400).end();

    try {
        const response = await changeEmail(session.user.id, req.body.email);
        response?.code ? res.status(response.code).end() : res.status(500).end();
    } catch (error) {
        console.error(error);
        res.status(500).end();
    }
}
