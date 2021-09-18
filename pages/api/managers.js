import { deleteAllManagers } from '../../lib/api/mutationFunctions';

module.exports = async (req, res) => {
    switch (req.method) {
        case 'GET':
            try {
                const response = await deleteAllManagers();
                // console.log('response in /api/managers:', response);
                if (response) res.status(200).json(response);
            } catch (error) {
                res.status(500).end();
            }
            break;
        default:
            res.status(401).end();
    }
};
