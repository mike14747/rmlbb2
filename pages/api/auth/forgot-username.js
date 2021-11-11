import { forgottenUsername } from '../../../lib/api/user';

export default async function managers(req, res) {
    if (req.method === 'POST') {
        try {
            // console.log('email:', req.body.email);
            if (!req.body.email) return res.status(400).end();
            const response = await forgottenUsername(req.body.email);
            response ? res.status(200).json({ msg: 'An email was sent to the user' }) : res.status(500).end();
        } catch (error) {
            res.status(500).end();
        }
    } else {
        res.status(401).end();
    }
}
