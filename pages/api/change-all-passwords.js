// import { changeAllPasswords } from '../../lib/api/user';

export default async function changePasswords(req, res) {
    return res.status(401).end();

    // await changeAllPasswords()
    //     .then((response) => res.status(200).json(response))
    //     .catch((error) => console.log(error.message) || res.status(500).end());
}
