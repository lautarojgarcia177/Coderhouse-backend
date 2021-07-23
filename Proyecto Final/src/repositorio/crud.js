export default class Crud {

    constructor(modelo) {
        this.modelo = modelo
    }

    obtenerTodos(callback) {}

    obtenerUno(id, callback) {}

    agregarUno(item, callback) {}

    actualizarItem(id, item, callback) {}

    borrarItem(id, callback) {}

    guardarCambiosEnArchivo(items, callback) {}

}