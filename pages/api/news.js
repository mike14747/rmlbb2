import { getNewsItems } from '../../lib/api/news';
// import { deleteAllNewsItems } from '../../lib/api/mutationFunctions';

export default async function news(req, res) {
    if (req.method !== 'GET') return res.status(401).end();

    try {
        if (!req.query.start || isNaN(req.query.start)) res.status(400).end();
        const response = await getNewsItems(parseInt(req.query.start));
        // const response = await deleteAllNewsItems();
        response ? res.status(200).json(response) : res.status(500).end();
    } catch (error) {
        console.error(error);
        res.status(500).end();
    }
}
