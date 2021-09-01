const Mensaje = require('../modelos/mensaje');
const MongoCRUD = require('../repositorio/crud');

class MensajesController extends MongoCRUD {

    constructor() {
        super(Mensaje);
    }
}

module.exports = new MensajesController();