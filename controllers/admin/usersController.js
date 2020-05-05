const router = require('express').Router();
const User = require('../../models/user');

router.get('/', async (req, res, next) => {
    res.send('Sending this from the /admin/usersController (/api/admin/users) GET route to get all users!');
});

router.get('/:id', async (req, res, next) => {
    res.send('Sending this from the /admin/usersController (/api/admin/users/:id) GET route to get a single user with id: ' + req.params.id + '!');
});

router.post('/', async (req, res, next) => {
    const paramsObj = {
        username: req.body.username,
        hashed_password: req.body.hashed_password,
        access_level: req.body.access_level,
        email: req.body.email,
    };
    try {
        const data = await User.addNewUser(paramsObj);
        data[0] ? res.json({ insertedCount: data[1].insertedCount }) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.put('/:id', async (req, res, next) => {
    res.send('Sending this from the /admin/usersController (/api/admin/users/:id) PUT route to update a user with id: ' + req.params.id + '!');
});

router.delete('/:id', async (req, res, next) => {
    res.send('Sending this from the /admin/usersController (/api/admin/users/:id) DELETE route to delete a user with id: ' + req.params.id + '!');
});

module.exports = router;
