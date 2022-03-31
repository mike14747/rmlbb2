import { getSession } from 'next-auth/react';
import { getForumListForEdit } from '../../../lib/api/forum';

export default async function adminForumList(req, res) {
    const session = await getSession({ req });
    if (!session?.user?.role || session.user.role !== 'admin') res.status(401).end();

    if (req.method === 'GET') {
        try {
            const response = await getForumListForEdit();
            response ? res.status(200).json(response) : res.status(500).end();
        } catch (error) {
            console.error(error);
            res.status(500).end();
        }
    } else {
        res.status(401).end();
    }
}
