const express = require('express');
const authMiddlewares = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const { orderValidation} = require('../validations');
const { orderController } = require('../controllers');

const router = express.Router();

router
    .route('/')
    // .get(authMiddlewares.auth(), validate(cartValidation.getOrders), cartController.getCart);

router
    .route('/confirm')
    .post(authMiddlewares.auth(), validate(orderValidation.confirmOrder), orderController.confirmOrder);
    

module.exports = router;