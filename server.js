require('dotenv').config();
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
    res.send('Sending this from the homepage');
});

app.use('/api', require('./controllers'));

app.get('*', (req, res) => {
    res.send('Page not found');
});

app.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT);
});
