let acumuladorDePalabras = 0;

const esperar = async (tiempo) => new Promise( (resolve) => setTimeout(resolve, tiempo));

const recorrerTexto = async (texto, callback, tiempoEntrePalabras) => {
    if(!!tiempoEntrePalabras) {
     tiempoEntrePalabras = 1000;
    }
    const arrayDePalabras = texto.split(' ');
    for (let i = 0; i< arrayDePalabras.length; i++) {
        await esperar(tiempoEntrePalabras);
        acumuladorDePalabras++;
        console.log(arrayDePalabras[i]);
    }
    callback()
}

function procesoCompleto() {
  console.log('proceso completo', acumuladorDePalabras);
}

recorrerTexto('Uno Dos Tres', () => {
    recorrerTexto('Cuatro Cinco Seis', () => {
        recorrerTexto('Siete Ocho Nueve', () => {
            procesoCompleto();
        }, 500)
    }, 500)
}, 500);