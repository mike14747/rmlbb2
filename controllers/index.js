const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => {
    res.send('Sending this from the api/test route');
});

module.exports = router;
