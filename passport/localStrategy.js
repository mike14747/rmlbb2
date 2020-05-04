const Strategy = require('passport-local').Strategy;
const bcryptjs = require('bcryptjs');
const User = require('../models/user');

const LocalStrategy = new Strategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
}, async (req, username, password, done) => {
    // console.log(bcryptjs.hashSync(password, 8));
    if (!req.user) {
        try {
            const data = await User.getUserByUsername({ username: username });
            if (data[0] && data[1].length > 0) {
                console.log('a user with that username was found in localStrategy:', data[1][0].username);
                bcryptjs.compare(password, data[1][0].hashed_password)
                    .then((res) => {
                        if (res) return done(null, { id: data[1][0]._id, username: data[1][0].username, access_level: data[1][0].access_level });
                        console.log('password does not match');
                        return done(null, 'password does not match');
                    })
                    .catch(error => console.log(error));
            } else if (data[0] && data[1].length === 0) {
                console.log('no user with that username was found in localStrategy');
                return done(null, 'no user was found');
            } else {
                console.log('an error occurred trying to find a user with that username in localStrategy');
                return done(data[1]);
            }
        } catch (error) {
            return done(error);
        }
    } else {
        console.log('localStrategy... req.user was already set:', req.user);
        return done(null, req.user);
    }
});

module.exports = LocalStrategy;
