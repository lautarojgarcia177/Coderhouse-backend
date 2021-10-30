const express = require('express');
const auth = require('../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .get((req, res) => res.render('index', {}));

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
    auth(),
    (req, res, next) => {
      debugger;
      console.log('been here');
      next();
    }
    ,
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

      return res.render('products', { products });
    }
  );

module.exports = router;
