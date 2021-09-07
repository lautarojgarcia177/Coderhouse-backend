var express = require('express');
var router = express.Router();
const { fork } = require('child_process');
var numCPUs = require('os').cpus().length;

function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/login');
  }
}

/* GET home page. */
router.get('/', checkAuthentication, function(req, res, next) {
  res.render('index', { title: 'Logeado con éxito', user: req.user });
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
    numeroDeProcesadores: numCPUs
  })
});

router.get('/randoms', (req,res,next) => {
  const cantidadDeNumeros = !!req.query.cant ? req.query.cant : 100000000;
  const randoms = fork('./lib/randoms.js');
  randoms.send(cantidadDeNumeros);
  randoms.on('message', randomsObject => res.json(randomsObject));
});

module.exports = router;
