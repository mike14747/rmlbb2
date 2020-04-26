/*
require('dotenv').config();
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
    res.send('Sending this from the homepage');
});

app.use('/api', require('./controllers'));

// app.get('*', (req, res) => {
//     res.send('Page not found');
// });

// app.listen(PORT, () => {
//     console.log('Server is listening on port ' + PORT);
// });

const mongoInit = require('./config/conn');
// const routes = require('./routes');
const route = function (app, db) {
    app.get('/teams', (req, res) => {
        db.collection('teams').find({}).toArray((err, docs) => {
            if (err) {
                console.log(err);
                res.error(err);
            } else {
                res.json(docs);
            }
        });
    });
    app.get('/blaze', (req, res) => {
        db.collection('teams').find({ name: 'Blaze' }).toArray((err, doc) => {
            if (err) {
                console.log(err);
                res.error(err);
            } else {
                res.json(doc);
            }
        });
    });
    return app;
};

mongoInit().then(db => {
    // initialize the application once database connection is ready
    route(app, db).listen(PORT, () => console.log('Listening on port ' + PORT));
}).catch(err => {
    console.error('Failed to make database connection!');
    console.error(err);
    process.exit(1);
});
*/

// test server.js

require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');

const mongodbConnect = require('./config/mongodbConnect');

const { PORT, NODE_ENV } = process.env;

mongodbConnect.serverConnect()
    .then(() => {
        app.use('/api', require('./controllers'));
    })
    .catch((error) => {
        console.error('Failed to connect to the database!\n' + error);
        app.get('*', (req, res) => {
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
