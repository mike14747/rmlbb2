import { getToken } from 'next-auth/jwt';
import { changePassword } from '../../../lib/api/user';

export default async function updatePassword(req, res) {
    if (req.method !== 'POST') return res.status(401).end();
    const token = await getToken({ req });
    if (!token && (!req.body.userId || !req.body.token)) return res.status(401).end();
    if (token && !req?.body?.password) return res.status(400).end();

    try {
        let response;
        if (token) {
            response = await changePassword(parseInt(token.id), req.body.password);
        } else if (req.body.userId && req.body.token) {
            response = await changePassword(parseInt(req.body.userId), req.body.password, req.body.token);
        } else {
            return res.status(400).end();
        }

        response?.code ? res.status(response.code).end() : res.status(500).end();
    } catch (error) {
        console.error(error);
        res.status(500).end();
    }
}
