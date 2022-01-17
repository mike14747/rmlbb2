import { forgottenUsername } from '../../../lib/api/user';

export default async function forgotUsername(req, res) {
    if (req.method === 'POST') {
        if (!req.body.email) return res.status(400).end();

        try {
            const response = await forgottenUsername(req.body.email);
            response?.code ? res.status(response.code).end() : res.status(500).end();
        } catch (error) {
            res.status(500).end();
        }
    } else {
        res.status(401).end();
    }
}
