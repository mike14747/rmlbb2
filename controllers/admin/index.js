const router = require('express').Router();

router.use('/teams', require('./teamsController'));
router.use('/users', require('./usersController'));

router.use((req, res, next) => {
    const error = new Error('Route not found!');
    error.status = 404;
    next(error);
});

router.use((error, req, res, next) => {
    res.status(error.status || 500).send('An error occurred!\n' + error.message);
});

module.exports = router;
