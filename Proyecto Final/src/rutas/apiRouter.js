import express from 'express';
export const apiRouter = express.Router();

import { routerProductos } from './api/productosRouter.js';
import { routerCarritos } from './api/carritoRouter.js';

apiRouter.use(express.urlencoded({ extended: true }))
apiRouter.use(express.json());
apiRouter.use('/productos', routerProductos);
apiRouter.use('/carrito', routerCarritos);