const router = require('express').Router();

router.post('/login', (req, res) => {
    console.log(req.body.username, req.body.password);
    res.redirect('/success');
});

module.exports = router;
