import { getSession } from 'next-auth/react';
import { getManagers } from '../../lib/api/directory';
// import { deleteAllManagers } from '../../lib/api/mutationFunctions';

export default async function directory(req, res) {
    if (req.method !== 'GET') res.status(401).end();
    const session = await getSession({ req });
    if (!session) res.status(401).end();

    try {
        const response = await getManagers();
        // const response = await deleteAllManagers();
        response ? res.status(200).json(response) : res.status(500).end();
    } catch (error) {
        console.error(error);
        res.status(500).end();
    }
}
