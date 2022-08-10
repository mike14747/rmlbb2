import { getAllActivePastEvents } from '../../lib/api/events';
// import { deleteAllEvents } from '../../lib/api/mutationFunctions';

export default async function pastEvents(req, res) {
    if (req.method !== 'GET') return res.status(401).end();

    try {
        const response = await getAllActivePastEvents();
        // const response = await deleteAllEvents();
        response ? res.status(200).json(response) : res.status(500).end();
    } catch (error) {
        console.error(error);
        res.status(500).end();
    }
}
