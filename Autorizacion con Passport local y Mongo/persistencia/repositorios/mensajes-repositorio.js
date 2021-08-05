const Mensaje = require('../modelos/mensaje');
const MongoCRUD = require('./crud');

class MensajesRepositorio extends MongoCRUD {

    constructor() {
        super(Mensaje);
    }
}

module.exports = new MensajesRepositorio();