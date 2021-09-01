var express = require('express');
var router = express.Router();
const { fork } = require('child_process');

// Con Fork
router.get('/info', (req, res, next) => {
  const info = fork('./lib/info.js');
  info.send('obtenerInfo');
  info.on('message', infoObject => {
    res.json(infoObject);
  });
});

// Sin fork
router.get('/randoms', (req,res,next) => {
  const cantidadDeNumeros = !!req.query.cant ? req.query.cant : 100000000;
  const randoms = require('../lib/randoms.js').generarObjetoRandoms(cantidadDeNumeros);
  res.json(randoms);
});

router.get('/', (req, res, next) => {
  res.send('Hola mundo');
});

module.exports = router;
