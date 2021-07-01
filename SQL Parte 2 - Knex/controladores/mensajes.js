const fs = require('fs');

class Mensajes {

    mensajes;
    filePath = __dirname + '/../archivos/mensajes.json'

    constructor() {
        fs.readFile(this.filePath, 'utf8', (err, archivoMensajes) => {
            if (err) {
                throw new Error(err)
            } else {
                this.mensajes = JSON.parse(archivoMensajes)
            }
        })
    }

    obtenerMensajes() {
        return this.mensajes;
    }

    agregarMensaje(mensaje) {
        this.mensajes.push(mensaje);
        fs.writeFile(this.filePath, JSON.stringify(this.mensajes), 'utf-8', (err) => {
            if (err) {
                throw new Error(err)
            }
        })
    }

}

module.exports = new Mensajes()