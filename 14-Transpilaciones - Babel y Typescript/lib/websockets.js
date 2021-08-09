const { Server } = require("socket.io");

// Importo las instancias de los controladores
const productos = require('../controladores/productos.js');
const mensajes = require('../controladores/mensajes.js');

// Exporto el websocket
module.exports.setup = function(server) {
    const io = new Server(server);
    io.on('connection', socket => {

        /* Le envio los productos actualizados al cliente */
        socket.emit('actualizarListado', productos.obtenerProductos());
        /* Le envio los mensajes actualizados al cliente */
        socket.emit('messages', mensajes.obtenerMensajes());

        /* Eventos */
        socket.on('insertarProducto', producto => {
            productos.agregarProducto(producto);
            io.emit('actualizarListado', productos.obtenerProductos());
        });
        socket.on('new-message', function(message) {
            mensajes.agregarMensaje(message);
            io.sockets.emit('messages', mensajes.obtenerMensajes());
        });
    });
}