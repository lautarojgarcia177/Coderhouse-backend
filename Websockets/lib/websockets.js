const { Server } = require("socket.io");

// importo la instancia del controlador
const productos = require('../controlador/productos.js');

module.exports.setup = function(server) {
    const io = new Server(server);
    io.on('connection', socket => {
        console.log('a user connected');
        socket.on('insertarProducto', producto => {
            productos.agregarProducto(producto);
            io.emit('actualizarListado', productos.obtenerProductos());
        });
    });
}