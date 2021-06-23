const fs = require('fs');
const { resolve } = require('path');

class Mensajes {
    mensajes;

    constructor() {
        leerArchivoDeMensajes()
            .then(mensajes => this.mensajes = JSON.parse(mensajes))
            .catch(err => {
                console.error('-------------------------------------------------', err, '-----------------------------')
                throw new Error(err)
            })
    }

    obtenerMensajes() {
        return this.mensajes;
    }

    agregarMensaje(mensaje) {
        this.mensajes.push(mensaje);
    }

}

async function leerArchivoDeMensajes() {
    return fs.readFile(__dirname + '/../archivos/mensajes.json', 'utf8', (err, archivoMensajes) => {
        if (err) {
            reject(err)
        } else {
            resolve(archivoMensajes)
        }
    })
}

module.exports = new Mensajes()