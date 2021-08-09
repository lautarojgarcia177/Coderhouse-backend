class Productos {
    productos;

    constructor() {
        this.productos = [{
                title: "Escuadra",
                price: 123.45,
                thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
                id: 1,
            },
            {
                title: "Calculadora",
                price: 234.56,
                thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
                id: 2,
            },
            {
                title: "Globo Terráqueo",
                price: 345.67,
                thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
                id: 3,
            },
        ];
    }

    obtenerProductos() {
        return this.productos;
    }

    obtenerProducto(id) {
        return this.productos.find((producto) => producto.id == id);
    }

    agregarProducto(producto) {
        this.productos.length === 0 ? (producto.id = 1) : (producto.id = this.productos.length + 1);
        this.productos.push(producto);
    }

    actualizarProducto(id, producto) {
        const productoAActualizar = this.productos.find(_producto => _producto.id == 10);
        if (!!productoAActualizar) {
            return Object.assign(productoAActualizar, producto);
        } else {
            return undefined;
        }
    }

    borrarProducto(id) {
        this.productos = this.productos.filter(producto => producto.id != id);
    }
}

module.exports = new Productos();