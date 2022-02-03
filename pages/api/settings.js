import { getSettings } from '../../lib/api/settings';

export default async function settings(req, res) {
    if (req.method !== 'GET') res.status(401).end();

    try {
        const response = await getSettings();
        response ? res.status(200).json(response) : res.status(500).end();
    } catch (error) {
        res.status(500).end();
    }
}
