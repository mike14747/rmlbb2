import { getSession } from 'next-auth/react';
import { getManagers } from '../../lib/api/directory';
// import { deleteAllManagers } from '../../lib/api/mutationFunctions';

export default async function managers(req, res) {
    if (req.method === 'GET') {
        const session = await getSession({ req });
        if (!session) res.send('Unauthorized').status(401).end();

        try {
            const response = await getManagers();
            response ? res.status(200).json(response) : res.status(500).end();
        } catch (error) {
            console.log(error);
            res.status(500).end();
        }
    } else {
        res.status(401).end();
    }
}
