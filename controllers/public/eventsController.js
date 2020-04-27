const router = require('express').Router();

router.get('/', async (req, res, next) => {
    res.send('Sending this from the /public/eventsController (/api/public/events) GET route to get all upcoming events!');
});

router.get('/:id', async (req, res, next) => {
    res.send('Sending this from the /public/eventsController (/api/public/events/:id) GET route to get a single upcoming event with id: ' + req.params.id + '!');
});

router.post('/', async (req, res, next) => {
    res.send('Sending this from the /public/eventsController (/api/public/events) POST route to add a new upcoming event!');
});

router.put('/:id', async (req, res, next) => {
    res.send('Sending this from the /public/eventsController (/api/public/events/:id) PUT route to update a single upcoming event with id: ' + req.params.id + '!');
});

router.delete('/:id', async (req, res, next) => {
    res.send('Sending this from the /public/eventsController (/api/public/events/:id) DELETE route to delete a single upcoming event with id: ' + req.params.id + '!');
});

module.exports = router;
