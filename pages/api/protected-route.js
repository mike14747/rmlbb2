import { getToken } from 'next-auth/jwt';
import { getProtectedData } from '../../lib/api/protected';

export default async function protectedRoute(req, res) {
    if (req.method !== 'GET') return res.status(401).end();
    const token = await getToken({ req });
    if (!token) return res.status(401).end();

    try {
        const response = await getProtectedData();
        response ? res.status(200).json(response) : res.status(500).end();
    } catch (error) {
        console.error(error);
        res.status(500).end();
    }
}
