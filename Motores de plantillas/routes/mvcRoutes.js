const express = require('express');
const router = express.Router();

router.get('/productos/vista', (req, res) => {
    console.log('been here');
    res.render('vista');
});

module.exports = router;