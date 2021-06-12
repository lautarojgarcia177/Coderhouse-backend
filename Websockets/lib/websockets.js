const { Server } = require("socket.io");

// Importo la instancia del controlador
const productos = require('../controlador/productos.js');

// Exporto el websocket
module.exports.setup = function(server) {
    const io = new Server(server);
    io.on('connection', socket => {
        socket.on('insertarProducto', producto => {
            productos.agregarProducto(producto);
            io.emit('actualizarListado', productos.obtenerProductos());
        });
    });
}