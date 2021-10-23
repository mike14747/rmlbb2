import { getAllActivePastEvents } from '../../lib/api/events';

export default async function managers(req, res) {
    if (req.method === 'GET') {
        try {
            const response = await getAllActivePastEvents();
            response ? res.status(200).json(response) : res.status(500).end();
        } catch (error) {
            res.status(500).end();
        }
    } else {
        res.status(401).end();
    }
}
