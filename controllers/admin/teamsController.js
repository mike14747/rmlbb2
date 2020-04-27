const router = require('express').Router();

router.get('/', async (req, res, next) => {
    res.send('Sending this from the /admin/teamsController (/api/admin/teams) GET route to get all teams!');
});

router.get('/:id', async (req, res, next) => {
    res.send('Sending this from the /admin/teamsController (/api/admin/teams/:id) GET route to get a single team with id: ' + req.params.id + '!');
});

router.post('/', async (req, res, next) => {
    res.send('Sending this from the /admin/teamsController (/api/admin/teams) POST route to add a new team!');
});

router.put('/:id', async (req, res, next) => {
    res.send('Sending this from the /admin/teamsController (/api/admin/teams/:id) PUT route to update a team with id: ' + req.params.id + '!');
});

router.delete('/:id', async (req, res, next) => {
    res.send('Sending this from the /admin/teamsController (/api/admin/teams/:id) DELETE route to delete a team with id: ' + req.params.id + '!');
});

module.exports = router;
