"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var productosController = require('./productos');
var fs = require('fs');
var pathArchivoCarritos = __dirname + '/../persistence/carritos.json';
var CarritosController = /** @class */ (function () {
    function CarritosController() {
        var _this = this;
        this.carritos = fs.readFileSync(pathArchivoCarritos, 'utf8', function (err, archivoCarritos) {
            if (err) {
                throw new Error(err);
            }
            else {
                _this.carritos = JSON.parse(archivoCarritos);
            }
        });
    }
    CarritosController.prototype.obtenerProductos = function (id_carrito) {
        var carrito = this.carritos.find(function (carrito) { return carrito.id === id_carrito; });
        if (!!carrito) {
            return carrito === null || carrito === void 0 ? void 0 : carrito.productos;
        }
        else {
            return [];
        }
    };
    CarritosController.prototype.agregarProducto = function (id_carrito, producto) {
        var carrito = this.carritos.find(function (carrito) { return carrito.id === id_carrito; });
        if (!!carrito) {
            carrito.productos.push(producto);
            this.guardarCambiosEnArchivo();
        }
    };
    CarritosController.prototype.borrarProducto = function (id_carrito, producto) {
        var carrito = this.carritos.find(function (carrito) { return carrito.id === id_carrito; });
        if (!!carrito) {
            carrito.productos = carrito.productos.filter(function (p) { return p.id != producto.id; });
        }
        this.guardarCambiosEnArchivo();
    };
    CarritosController.prototype.guardarCambiosEnArchivo = function () {
        fs.writeFileSync(pathArchivoCarritos, JSON.stringify(this.carritos), function (err) { if (err)
            console.error('Error al escribir el archivo de carritos'); });
    };
    return CarritosController;
}());
module.exports = new CarritosController();
