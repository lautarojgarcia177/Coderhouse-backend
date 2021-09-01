const { Server } = require("socket.io");

// Importo las instancias de los controladores
const productosController = require('../controladores/productos.js');
const mensajesController = require('../controladores/mensajes.js');

// Exporto el websocket
module.exports.setup = function(server) {
    const io = new Server(server);
    io.on('connection', socket => {
        /* Le envio los productos actualizados al cliente */
        productosController.obtenerProductos().then(productos => {
            socket.emit('actualizarListado', productos);
        }).catch(console.error)
        /* Le envio los mensajes actualizados al cliente */
        mensajesController.obtenerMensajes().then(mensajes => {
            console.log(mensajes);
            socket.emit('messages', mensajes);
        }).catch(console.error)

        /* Eventos */
        socket.on('insertarProducto', producto => {
            productosController.agregarProducto(producto).then(() => {
                productosController.obtenerProductos().then(productos => {
                    io.emit('actualizarListado', productos);
                })
            }).catch(console.error);
        });
        socket.on('new-message', function(message) {
            mensajesController.agregarMensaje(message).then(() => {
                mensajesController.obtenerMensajes().then(mensajes => {
                    io.sockets.emit('messages', mensajes);
                })
            });
        });
    });
}