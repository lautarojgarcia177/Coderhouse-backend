class Productos {

    productos;

    constructor() {
        this.productos = [];
    }

    obtenerProductos() {
        return this.productos;
    }

    obtenerProducto(id) {
        return this.productos.find(producto => producto.id === id);
    }

    agregarProducto(producto) {
        productos.length === 0 ? producto.id = 1 : producto.id = productos.length + 1;
        this.productos.push(producto);
    }

}

// exporto una instancia de la clase
module.exports = new Productos();