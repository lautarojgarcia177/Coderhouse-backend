var express = require('express');
var router = express.Router();
const { fork } = require('child_process');

function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send('Debe autenticarse primero');
  }
}

/* GET home page. */
router.get('/', checkAuthentication, function(req, res, next) {
  res.render('index', { title: 'Logeado con éxito' });
});

router.get('/info', (req, res, next) => {
  res.json({
    argumentosDeEntrada: process.argv,
    plataforma: process.platform,
    versionDeNode: process.version,
    memoriaEnUso: process.memoryUsage(),
    pathDeEjecucion: process.execPath,
    idProceso: process.pid,
    carpetaCorriente: process.cwd(),
  })
});

router.get('/randoms', (req,res,next) => {
  console.log('cant', req.query.cant);
  const cantidadDeNumeros = !!req.query.cant ? req.query.cant : 100000000;
  const randoms = fork('./lib/randoms.js');
  randoms.send(cantidadDeNumeros);
  randoms.on('message', randomsObject => res.json(randomsObject));
});

module.exports = router;
