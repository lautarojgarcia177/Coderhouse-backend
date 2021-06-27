"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
var pathArchivoProductos = __dirname + '/../persistence/products.json';
/*
 Las date las trabajo de esta forma:
Año, Mes, Dia, Hora, Minuto, Segundo
Tener cuidado con los meses porque empieza de 0. Junio es 0 y Diciembre es 11
*/
var ProductosController = /** @class */ (function () {
    function ProductosController() {
        var _this = this;
        this.productos = fs.readFileSync(pathArchivoProductos, 'utf8', function (err, archivoProductos) {
            if (err) {
                throw new Error(err);
            }
            else {
                _this.productos = JSON.parse(archivoProductos);
            }
        });
    }
    ProductosController.prototype.obtenerProductos = function () {
        return this.productos;
    };
    ProductosController.prototype.obtenerProducto = function (id) {
        return this.productos.find(function (producto) { return producto.id == id; });
    };
    ProductosController.prototype.agregarProducto = function (producto) {
        this.productos.length === 0 ? (producto.id = 1) : (producto.id = this.productos.length + 1);
        this.productos.push(producto);
        this.guardarCambiosEnArchivo();
    };
    ProductosController.prototype.actualizarProducto = function (id, producto) {
        var productoAActualizar = this.productos.find(function (_producto) { return _producto.id == id; });
        if (!!productoAActualizar) {
            var productoActualizado = Object.assign(productoAActualizar, producto);
            this.guardarCambiosEnArchivo();
            return productoActualizado;
        }
        else {
            return undefined;
        }
    };
    ProductosController.prototype.borrarProducto = function (id) {
        this.productos = this.productos.filter(function (producto) { return producto.id != id; });
        this.guardarCambiosEnArchivo();
    };
    ProductosController.prototype.guardarCambiosEnArchivo = function () {
        fs.writeFileSync(pathArchivoProductos, JSON.stringify(this.productos), function (err) { if (err)
            console.error('Error al escribir el archivo de productos'); });
    };
    return ProductosController;
}());
module.exports = new ProductosController();
