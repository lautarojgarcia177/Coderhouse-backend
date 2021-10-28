const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const productRoute = require('./product.route');
const viewsRoute = require('./views.route');
const config = require('../config/config');

const router = express.Router();

const viewsRoutes = [
  {
    path: '/',
    route: viewsRoute
  }
];

const apiRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/products',
    route: productRoute
  }
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

apiRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

viewsRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;