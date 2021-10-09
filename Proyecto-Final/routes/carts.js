const express = require('express');
const router = express.Router();
const controller = require('../api/carts');
const productsController = require('../api/products');

router.get('/carts', async (req, res) => {
    try {
        let result = await controller.findAll();
        return res.json(result);
    } catch (error) {
        return res.status(500).send({ error: error.cart });
    }
});

router.get('/carts/:id', async (req, res) => {
    try {
        let result = await controller.findById(req.params.id);
        return res.json(result);
    } catch (error) {
        return res.status(500).send({ error: error.cart });
    }
});

router.post('/carts', async (req, res) => {
    try {
        let result = await controller.create(req.body);
        return res.json(result);
    } catch (error) {
        return res.status(500).send({ error: error.cart });
    }
});

router.put('/carts/:id', async (req, res) => {
    try {
        let result = await controller.update(req.params.id, req.body);
        return res.json(result);
    } catch (error) {
        return res.status(500).send({ error: error.cart });
    }
});

router.delete('/carts/:id', async (req, res) => {
    try {
        let result = await controller.delete(req.params.id);
        return res.json(result);
    } catch (error) {
        return res.status(500).send({ error: error.cart });
    }
});

router.post('/carts/addProduct', (req, res, next) => {
   console.log(req.body);
    try {
       productsController.findById(req.body.productId).then(product => {
          console.log('product stock', product);
       });
       return res.end();
   } catch (error) {
       return res.status(500).send({ error });
   }
});

module.exports = router;