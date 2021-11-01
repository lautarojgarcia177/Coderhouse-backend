const express = require('express');
const authMiddlewares = require('../middlewares/auth');
const passport = require('passport');

const router = express.Router();

router
  .route('/')
  .get(
    authMiddlewares.getUser(),
    (req, res) => res.render('index', { user: req.user })
  );

router
  .route('/login')
  .get((req, res) => {
    res.render('login', { })
  });

router
  .route('/register')
  .get((req, res) => res.render('register', {}));

router
  .route('/products')
  .get(
    authMiddlewares.auth(),
    (req, res) => {
      let products = [
        {
          title: 'producto1',
          price: 10
        },
        {
          title: 'producto2',
          price: 20
        }
      ];

      return res.render('products', { products, user: req.user });
    }
  );

module.exports = router;
