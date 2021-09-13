import { getActiveLinks } from '../../lib/api/links';

module.exports = async (req, res) => {
    switch (req.method) {
        case 'GET':
            try {
                const response = await getActiveLinks();
                if (response) res.status(200).json(response);
            } catch (error) {
                res.status(500).end();
            }
            break;
        default:
            res.status(401).end();
    }
};
