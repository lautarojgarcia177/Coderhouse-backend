import { Fabrica } from '../fabrica/index.js'
class _ProductosControlador {

    constructor() {
        this.persistencia = Fabrica
        this.DAOProductos = this.persistencia.crearDAO('producto')
    }

    obtenerProductos(callback) {
        return this.DAOProductos.obtenerTodos(callback)
    }

    obtenerProducto(id, callback) {
        return this.DAOProductos.obtenerUno(id, callback)
    }

    agregarProducto(item, callback) {
        return this.DAOProductos.agregarUno(item, callback)
    }

    actualizarProducto(id, item, callback) {
        return this.DAOProductos.actualizarItem(id, item, callback)
    }

    borrarProducto(id, callback) {
        return this.DAOProductos.borrarItem(id, callback)
    }

}

export const ProductosControlador = new _ProductosControlador()