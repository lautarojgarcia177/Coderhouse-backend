import express from 'express';
export const apiRouter = express.Router();

import { routerProductos } from './api/productosRouter.js';

apiRouter.use(express.urlencoded({ extended: true }))
apiRouter.use(express.json());
apiRouter.use('/productos', routerProductos);