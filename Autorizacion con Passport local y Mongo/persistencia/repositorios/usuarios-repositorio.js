const Usuario = require('../modelos/usuario');
const MongoCRUD = require('./crud');

class UsuariosRepositorio extends MongoCRUD {
    constructor() {
        super(Usuario);
    }
}

module.exports = new UsuariosRepositorio();