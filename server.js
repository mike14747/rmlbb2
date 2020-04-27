require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');

const mongodbConnect = require('./config/mongodbConnect');

const { PORT, NODE_ENV } = process.env;

mongodbConnect.serverConnect()
    .then(() => {
        app.use('/api/public', require('./controllers/public'));
        app.use('/api/private', require('./controllers/public'));
        app.use('/api/admin', require('./controllers/admin'));
    })
    .catch((error) => {
        console.error('Failed to connect to the database!\n' + error);
        app.get('/api', (req, res) => {
            res.status(500).send('There is no connection to MongoDB!');
        });
    })
    .finally(() => {
        if (NODE_ENV === 'production') {
            app.use(express.static('./client/build'));
            app.get('*', (req, res) => {
                res.sendFile(path.join(__dirname, './client/build/index.html'));
            });
        }
    });

app.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT);
});
