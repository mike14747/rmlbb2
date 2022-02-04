import { getMoreNewsItems } from '../../lib/api/news';
// import { deleteAllNewsItems } from '../../lib/api/mutationFunctions';

export default async function news(req, res) {
    if (req.method !== 'GET') res.status(401).end();

    try {
        console.log('parseInt(req.query.start):', parseInt(req.query.start));
        if (!req.query.start || isNaN(req.query.start)) res.status(400).end();
        const response = await getMoreNewsItems(parseInt(req.query.start));
        // const response = await deleteAllNewsItems();
        response ? res.status(200).json(response) : res.status(500).end();
    } catch (error) {
        res.status(500).end();
    }
}
