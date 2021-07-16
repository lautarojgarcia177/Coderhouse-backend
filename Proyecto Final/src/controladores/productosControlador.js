import { Fabrica } from '../fabrica/index.js'
export default class ProductosControlador {

    constructor() {
        this.persistencia = new Fabrica()
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