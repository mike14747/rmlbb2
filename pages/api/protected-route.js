import { getSession } from 'next-auth/react';
import { getProtectedData } from '../../lib/api/directory';
// import { deleteAllManagers } from '../../lib/api/mutationFunctions';

export default async function ProtectedRoute(req, res) {
    if (req.method !== 'GET') res.status(401).end();
    const session = await getSession({ req });
    if (!session) res.status(401).end();

    try {
        const response = await getProtectedData();
        response ? res.status(200).json(response) : res.status(500).end();
    } catch (error) {
        console.error(error);
        res.status(500).end();
    }
}
