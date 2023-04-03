import { getToken } from 'next-auth/jwt';
// import { addForum } from '../../../lib/api/forum';

export default async function addNewForum(req, res) {
    if (req.method !== 'POST') return res.status(401).end();
    const token = await getToken({ req });
    if (!token?.role || token.role !== 'admin') return res.status(401).end();
    if (!req?.body?.name) return res.status(400).end();

    return res.status(201).end();

    // try {
    //     const response = await addForum(req.body.name, req.body?.active);
    //     response?.code ? res.status(response.code).end() : res.status(500).end();
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).end();
    // }
}
