const express = require('express');
const router = express.Router();
const controller = require('../api/carts');
const productsController = require('../api/products');
const consoleLogger = require('../lib/logger').loggerConsole;

router.get('/carts', async (req, res) => {
    try {
        let result = await controller.findAll();
        return res.json(result);
    } catch (error) {
        return res.status(500).send({error: error.cart});
    }
});

router.get('/carts/:id', async (req, res) => {
    try {
        let result = await controller.findById(req.params.id);
        return res.json(result);
    } catch (error) {
        return res.status(500).send({error: error.cart});
    }
});

router.post('/carts', async (req, res) => {
    try {
        let result = await controller.create(req.body);
        return res.json(result);
    } catch (error) {
        return res.status(500).send({error: error.cart});
    }
});

router.put('/carts/:id', async (req, res) => {
    try {
        let result = await controller.update(req.params.id, req.body);
        return res.json(result);
    } catch (error) {
        return res.status(500).send({error: error});
    }
});

router.delete('/carts/:id', async (req, res) => {
    try {
        let result = await controller.delete(req.params.id);
        return res.json(result);
    } catch (error) {
        return res.status(500).send({error: error.cart});
    }
});

router.patch('/carts/addProduct/:productId', (req, res, next) => {
    try {
        let stock;
        // Reduce product stock by 1
        productsController.findById(req.params.productId).then(product => {
            stock = product.stock;
            if (stock < 1) {
                return res.send('No hay stock');
            }
            stock--;
            // Update cart
            controller.findOne({user: req.user.id}).lean().then(async cart => {
                // If there is this product already in cart, increase the amount
                let cartProduct = cart.products.find(cartProduct => cartProduct.product == req.params.productId);
                if (!cartProduct) {
                    cartProduct = {
                        product: req.params.productId,
                        amount: 1
                    }
                    cart.products.push(cartProduct);
                } else {
                    cartProduct.amount++;
                }
                let updatedCart = await controller.update(cart._id.toString(), cart).lean();
                await productsController.update(req.params.productId, {stock});
                return res.json(updatedCart);
            }).catch(err => consoleLogger.warn('There was an error updating the  cart', err));
        });
    } catch (error) {
        return res.status(500).send({error});
    }
});

module.exports = router;