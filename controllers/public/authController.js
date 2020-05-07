const router = require('express').Router();
const passport = require('../../passport/passportFunctions');

router.get('/logout', (req, res) => {
    req.logOut();
    req.session = null;
    res.status(200).json({ message: 'User has been logged out', user: null });
});

router.post('/login', (req, res, next) => {
    passport.authenticate('login', (error, user, info) => {
        // console.log('authenticate user argument:', user);
        // the user argument is the full deserialized user object
        if (error) return next(error);
        if (!user) return res.status(400).json(info);
        // at this point, a valid users object must have been found
        req.login(user, function (error) {
            // if there isn't an error, passport will write the user object into req.user at this point
            if (error) return next(error);
            // console.log('req.user, inside req.login():', req.user);
        });
        // console.log('req.user, after req.login()', req.user);
        // return the full user object in a json
        return res.status(200).json({ user: user });
    })(req, res, next);
});

module.exports = router;
