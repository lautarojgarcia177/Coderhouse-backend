const express = require("express");
const router = express.Router();
const passport = require('passport');

router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/facebook/callback', passport.authenticate('facebook',
    {
        successRedirect: '/datos',
        failureRedirect: '/faillogin'
    }
));

router.get('/faillogin', (req, res) => {
    res.status(401).send({ error: 'no se pudo autenticar con facebook' })
});

router.get('/datos', (req, res) => {
    if (req.isAuthenticated()) {
        res.send('<h1>datos protegidos</h1>');
    } else {
        res.status(401).send('debe autenticarse primero');
    }
});

router.get('/logout', (req, res) => {
    req.logout();
    res.send({ logout: 'ok' });
});

module.exports = router;
