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

connection.mongodbConnect()
    .then(() => {
        app.use('/api/public', require('./controllers/public'));
        app.use('/api/private', require('./controllers/private'));
        app.use('/api/admin', require('./controllers/admin'));
        const passport = require('./passport/passport');
        app.use(passport.initialize());
        app.use(passport.session());
        app.post('/login', function (req, res, next) {
            if (req.isAuthenticated()) {
                res.send('user is already logged in');
            } else {
                passport.authenticate('local', function (error, user, info) {
                    // console.log('auth user', user);
                    if (error) return res.status(500).send('server.js... failed to authenticate user', error);
                    if (user === 'no user was found') return res.status(400).send('server.js... no user found');
                    if (user === 'password does not match') return res.status(400).send('server.js... password does not match');
                    req.login(user, function (error) {
                        if (error) console.log(error);
                        // console.log('login:', req.user);
                    });
                    // console.log('req.user', req.user);
                    return res.status(200).json({ user: user });
                })(req, res, next);
            }
        });
        app.get('/logout', (req, res) => {
            if (!req.isAuthenticated()) {
                res.send('user is not logged in');
            }
            console.log(req.user);
            req.logOut();
            req.session = null;
            res.send('user has been logged out');
        });
        app.get('/', (req, res) => {
            console.log(req.user);
            res.send('Sending this from the homepage!');
        });
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
