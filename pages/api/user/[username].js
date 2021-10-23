import { getUserProfile } from '../../../lib/api/user';

module.exports = async (req, res) => {
    switch (req.method) {
        case 'GET':
            try {
                const response = await getUserProfile(req.query.username);
                response ? res.status(200).json(response) : res.status(500).end();
            } catch (error) {
                res.status(500).end();
            }
            break;
        default:
            res.status(401).end();
    }
};
