require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const connection = require('./config/connectionPool');

const session = require('cookie-session');

const { PORT, NODE_ENV } = process.env;

app.use(session({
    maxAge: 2592000000, // maxAge: 2592000000 is 30 days
    name: 'rmlbb_session',
    keys: ['key1', 'key2'],
}));

function checkAuthenticatedUser(req, res, next) {
    if (req.isAuthenticated() && req.user.access_level >= 1) {
        return next();
    } else {
        // return res.status(401).json({ message: 'User is not logged in!' });
        return next();
    }
}

function checkAuthenticatedAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.access_level >= 3) {
        return next();
    } else {
        // return res.status(401).json({ message: 'User needs admin priviledges!' });
        return next();
    }
}

connection.mongodbConnect()
    .then(() => {
        const passport = require('./passport/passportFunctions');
        app.use(passport.initialize());
        app.use(passport.session());
        app.use('/api/public', require('./controllers/public'));
        app.use('/api/private', checkAuthenticatedUser, require('./controllers/private'));
        app.use('/api/admin', checkAuthenticatedAdmin, require('./controllers/admin'));
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
        app.listen(PORT, () => {
            console.log('Server is listening on port ' + PORT);
        });
    });
