// Proceso hijo

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function generarObjetoRandoms(cantidadDeRandoms) {
  // Ahora separarlo en otro proceso que no sea bloqueante
  let objetoRandoms = {};
  for (let i = 0; i < cantidadDeRandoms; i++) {
    const randomNumber = String(Math.floor(getRandomArbitrary(1, 1000)));
    if (objetoRandoms.hasOwnProperty(randomNumber)) {
      objetoRandoms[randomNumber]++;
    } else {
      objetoRandoms[randomNumber] = 1;
    }
  }
  return objetoRandoms;
}

process.on("message", (cant) => {
  const objetoRandoms = generarObjetoRandoms(cant);
  process.send(objetoRandoms);
});
