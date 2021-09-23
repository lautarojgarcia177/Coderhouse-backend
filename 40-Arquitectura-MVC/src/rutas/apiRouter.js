var express = require('express');
const apiRouter = express.Router();

var routerProductos = require('./api/productosRouter.js').routerProductos;

apiRouter.use(express.urlencoded({ extended: true }))
apiRouter.use(express.json());
apiRouter.use('/productos', routerProductos);

module.exports = {
    apiRouter
}