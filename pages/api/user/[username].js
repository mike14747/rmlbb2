import { getSession } from 'next-auth/react';
import { getUserProfile, updateUserProfile } from '../../../lib/api/user';

export default async function user(req, res) {
    const session = await getSession({ req });
    if (!session || session.user.name !== req.query.username) res.status(401).end();

    switch (req.method) {
        case 'GET':
            try {
                const response = await getUserProfile(req.query.username);
                response ? res.status(200).json(response) : res.status(500).end();
            } catch (error) {
                res.status(500).end();
            }
            break;
        case 'PUT':
            try {
                const response = await updateUserProfile(req.query.username);
                response ? res.status(200).json(response) : res.status(500).end();
            } catch (error) {
                res.status(500).end();
            }
            break;
        default:
            res.status(401).end();
    }
}
