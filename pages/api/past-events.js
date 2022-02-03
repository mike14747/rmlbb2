import { getAllActivePastEvents } from '../../lib/api/events';

export default async function pastEvents(req, res) {
    if (req.method !== 'GET') res.status(401).end();

    try {
        const response = await getAllActivePastEvents();
        response ? res.status(200).json(response) : res.status(500).end();
    } catch (error) {
        res.status(500).end();
    }
}
