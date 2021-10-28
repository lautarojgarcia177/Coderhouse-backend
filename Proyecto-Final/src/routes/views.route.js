const express = require('express');
const auth = require('../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .get((req, res) => res.render('index', {}) );

router
  .route('/login')
  .get((req, res) => res.render('login', {}));

module.exports = router;
