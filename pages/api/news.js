import { getMoreNewsItems } from '../../lib/api/news';

module.exports = async (req, res) => {
    switch (req.method) {
        case 'GET':
            try {
                if (!req.query.start || isNaN(req.query.start)) res.status(400).end();
                const response = await getMoreNewsItems(parseInt(req.query.start));
                response ? res.status(200).json(response) : res.status(500).end();
            } catch (error) {
                res.status(500).end();
            }
            break;
        default:
            res.status(401).end();
    }
};
