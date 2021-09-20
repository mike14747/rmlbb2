import { getSession } from 'next-auth/react';
import { getManagers } from '../../lib/api/directory';
// import { deleteAllManagers } from '../../lib/api/mutationFunctions';

export default async function managers(req, res) {
    const session = await getSession({ req });

    if (req.method === 'GET' && session) {
        try {
            const response = await getManagers();
            if (response) {
                // console.log('response in api route:', response[0].divisions[0]);
                res.status(200).json(response);
            }
        } catch (error) {
            res.status(500).end();
        }
    } else {
        res.status(401).end();
    }
}
