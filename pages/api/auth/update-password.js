import { getSession } from 'next-auth/react';
import { changePassword } from '../../../lib/api/user';

export default async function updatePassword(req, res) {
    if (req.method === 'POST') {
        const session = await getSession({ req });

        // add support for updating a user's password via the reset password link that was sent via email... check for session or token, then pass the appropriate one to the serverless function

        if (!session) res.status(401).end();
        if (!req?.body?.newPassword) return res.status(400).end();

        try {
            const response = await changePassword(session.user._id, req.body.newPassword);
            response?.code ? res.status(response.code).end() : res.status(500).end();
        } catch (error) {
            res.status(500).end();
        }
    } else {
        res.status(401).end();
    }
}
