const router = require('express').Router();

router.get('/', async (req, res, next) => {
    res.send('Sending this from the /public/newsController (/api/public/news) GET route to get all news items!');
});

router.get('/:id', async (req, res, next) => {
    res.send('Sending this from the /public/newsController (/api/public/news/:id) GET route to get a single news item with id: ' + req.params.id + '!');
});

router.post('/', async (req, res, next) => {
    res.send('Sending this from the /public/newsController (/api/public/news) POST route to add a new news items!');
});

router.put('/:id', async (req, res, next) => {
    res.send('Sending this from the /public/newsController (/api/public/news/:id) PUT route to update a single news item with id: ' + req.params.id + '!');
});

router.delete('/:id', async (req, res, next) => {
    res.send('Sending this from the /public/newsController (/api/public/news/:id) DELETE route to delete a single news item with id: ' + req.params.id + '!');
});

module.exports = router;
