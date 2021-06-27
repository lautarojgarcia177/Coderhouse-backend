import express from 'express';
const router: express.Router = express.Router();

const productosRouter = require('./productos');
const carritoRouter = require('./productos');

router.use('/productos', productosRouter);
router.use('/carrito', carritoRouter);

module.exports = router;