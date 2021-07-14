const Mensaje = require('../modelos/mensaje');
const MongoCRUD = require('../repositorio/crud');

class MensajeController extends MongoCRUD {

    constructor() {
        super(Mensaje);
    }
}

module.exports = new MensajeController();