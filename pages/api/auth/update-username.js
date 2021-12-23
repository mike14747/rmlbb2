import { updateUserProfile } from '../../../lib/api/user';

export default async function forgotUsername(req, res) {
    if (req.method === 'POST') {
        try {
            if (!req.body.newUsername && !req.body.newPassword && !req.body.newEmail) return res.status(400).end();
            const response = await updateUserProfile(req.body);
            response ? res.status(200).end() : res.status(500).end();
        } catch (error) {
            res.status(500).end();
        }
    } else {
        res.status(401).end();
    }
}
