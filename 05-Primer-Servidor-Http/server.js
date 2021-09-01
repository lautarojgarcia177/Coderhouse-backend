const http = require('http');

const server = http.createServer((peticion, respuesta) => {
    const res = generarRespuesta();
    respuesta.end(res);
});

const PUERTO = 3000;

server.listen(PUERTO, function () {
    console.log('El servidor esta esuchado en el puerto', PUERTO);
});

function generarRespuesta() {
  const numeroRandom = Math.floor(Math.random() * 10 + 1); 
   return JSON.stringify({
     id: numeroRandom,
     title: `Producto ${numeroRandom}`,
     price: Math.floor(Math.random() * 9999.99),
     thumbnail: `Foto ${numeroRandom}`
   });
}