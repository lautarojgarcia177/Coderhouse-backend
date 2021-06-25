"use strict";
/*
 Las date las trabajo de esta forma:
Año, Mes, Dia, Hora, Minuto, Segundo
Tener cuidado con los meses porque empieza de 0. Junio es 0 y Diciembre es 11
*/
var Productos = /** @class */ (function () {
    function Productos() {
        this.productos = [
            {
                id: 0,
                timestamp: new Date(2021, 5, 25, 19, 15, 30),
                nombre: 'Calculadora',
                descripcion: 'Calculadora marca Casio modelo CK250',
                codigo: '6v5epngy',
                foto: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',
                precio: 234.56,
                stock: 2
            },
            {
                id: 1,
                timestamp: new Date(2021, 5, 25, 19, 15, 30),
                nombre: 'Globo Terráqueo',
                descripcion: 'Globo terraqueo marca maped mapamundi',
                codigo: 'puef3rof',
                foto: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png',
                precio: 345.67,
                stock: 4
            },
        ];
    }
    Productos.prototype.obtenerProductos = function () {
        return this.productos;
    };
    Productos.prototype.obtenerProducto = function (id) {
        return this.productos.find(function (producto) { return producto.id == id; });
    };
    Productos.prototype.agregarProducto = function (producto) {
        this.productos.length === 0 ? (producto.id = 1) : (producto.id = this.productos.length + 1);
        this.productos.push(producto);
    };
    Productos.prototype.actualizarProducto = function (id, producto) {
        var productoAActualizar = this.productos.find(function (_producto) { return _producto.id == id; });
        if (!!productoAActualizar) {
            return Object.assign(productoAActualizar, producto);
        }
        else {
            return undefined;
        }
    };
    Productos.prototype.borrarProducto = function (id) {
        this.productos = this.productos.filter(function (producto) { return producto.id != id; });
    };
    return Productos;
}());
module.exports = new Productos();
