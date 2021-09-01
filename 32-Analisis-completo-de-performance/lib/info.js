var numCPUs = require('os').cpus().length;

// Proceso hijo

function obtenerInfo() {
  return {
    argumentosDeEntrada: process.argv,
    plataforma: process.platform,
    versionDeNode: process.version,
    memoriaEnUso: process.memoryUsage(),
    pathDeEjecucion: process.execPath,
    idProceso: process.pid,
    carpetaCorriente: process.cwd(),
    numeroDeProcesadores: numCPUs,
  };
}

process.on("message", () => {
  const objetoInfo = obtenerInfo();
  process.send(objetoInfo);
});
