const router = require('express').Router();

router.get('*', (req, res) => {
    res.status(500).send('There is no connection to MongoDB!');
});

module.exports = router;
