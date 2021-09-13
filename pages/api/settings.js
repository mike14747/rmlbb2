import { getSettings } from '../../lib/api/settings';

module.exports = async (req, res) => {
    switch (req.method) {
        case 'GET':
            try {
                const response = await getSettings();
                if (response) res.status(200).json(response);
            } catch (error) {
                res.status(500).end();
            }
            break;
        default:
            res.status(401).end();
    }
};
