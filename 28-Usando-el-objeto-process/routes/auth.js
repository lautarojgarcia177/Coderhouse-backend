const express = require("express");
const router = express.Router();
const passport = require('passport');


router.get('/login', passport.authenticate('facebook'));

router.get('/login/callback', passport.authenticate('facebook',
    {
        successRedirect: '/',
        failureRedirect: '/faillogin'
    }
));

router.get('/faillogin', (req, res) => {
    res.status(401).send({ error: 'no se pudo autenticar con facebook' })
});

router.get('/logout', (req, res) => {
    req.logout();
    res.send({ logout: 'ok' });
});

module.exports = router;
