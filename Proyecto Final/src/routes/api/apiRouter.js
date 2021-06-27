import express from 'express';
export const apiRouter = express.Router();

import { routerProductos } from './productosRoutes.js';
import { routerCarritos } from './carritoRoutes.js';

apiRouter.use(express.json());
apiRouter.use('/productos', routerProductos);
apiRouter.use('/carrito', routerCarritos);