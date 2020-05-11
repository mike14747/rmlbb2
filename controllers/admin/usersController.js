const router = require('express').Router();
const User = require('../../models/user');
const bcryptjs = require('bcryptjs');
const salt = bcryptjs.genSaltSync(10);

router.get('/', async (req, res, next) => {
    res.send('Sending this from the /admin/usersController (/api/admin/users) GET route to get all users!');
});

router.get('/:id', async (req, res, next) => {
    res.send('Sending this from the /admin/usersController (/api/admin/users/:id) GET route to get a single user with id: ' + req.params.id + '!');
});

router.post('/', async (req, res, next) => {
    if (typeof (req.body.username) !== 'string' || !req.body.username.match(/^[a-zA-Z][a-zA-Z0-9-_]{4,10}[a-zA-Z0-9]$/)) {
        return res.status(400).json({ error: 'Invalid username!' });
    }
    if (typeof (req.body.password) !== 'string' || !req.body.password.match(/^[a-zA-Z0-9-_]{6,12}$/)) {
        return res.status(400).json({ error: 'Invalid password!' });
    }
    const paramsObj = {
        username: req.body.username,
        hashed_password: bcryptjs.hashSync(req.body.password, salt),
        access_level: req.body.access_level,
        email: req.body.email,
    };
    try {
        const data = await User.addNewUser(paramsObj);
        data[0] ? res.json({ insertedCount: data[0].insertedCount || 0 }) : next(data[1]);
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
