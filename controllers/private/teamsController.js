const router = require('express').Router();
const Team = require('../../models/team');

router.get('/', async (req, res, next) => {
    try {
        const data = await Team.getTeams();
        data[0] ? res.json(data[1]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const data = await Team.getOneTeam(req.params.id);
        data[0] ? res.json(data[1]) : next(data[1]);
    } catch (error) {
        res.send(error);
    }
});

module.exports = router;
