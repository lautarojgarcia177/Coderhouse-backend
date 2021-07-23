socket.on('messages', function(data) {
    render(data);
});

function render(data) {
    const longitudMensajesNormalizado = JSON.stringify(data).length;
    const autorNormalizerSchema = new normalizr.schema.Entity('autores')
    const mensajeNormalizerSchema = new normalizr.schema.Entity('mensaje',{autor: [autorNormalizerSchema]} )
    const mensajesNormalizerSchema = [mensajeNormalizerSchema];
    data = normalizr.denormalize(data.result, mensajesNormalizerSchema, data.entities);
    const longitudMensajesDesnormalizado = JSON.stringify(data).length;
    console.log(data);
    const porcentajeCompresion = 100 * (1 - (longitudMensajesDesnormalizado / longitudMensajesNormalizado));
    var html = 'Porcentaje de compresion normalizado: ' + porcentajeCompresion + '%' + data.map(function(elem, index) {
        return (`
            <div>
                <b style="color:blue;">${elem.author.alias}</b> 
                [<span style="color:brown;">${elem.author.email}</span>] : 
                <i style="color:green;">${elem.text}</i>
            </div>
        `)
    }).join(" ");
    document.getElementById('messages').innerHTML = html;
}

const userCentroMensajes = document.getElementById('username')
const textoCentroMensajes = document.getElementById('texto')
const botonCentroMensajes = document.getElementById('enviar')

function addMessage(e) {
    var mensaje = {
        author: userCentroMensajes.value,
        text: textoCentroMensajes.value,
        fyh: new Date().toLocaleDateString()
    };
    socket.emit('new-message', mensaje);

    textoCentroMensajes.value = ''
    textoCentroMensajes.focus()

    botonCentroMensajes.disabled = true

    return false;
}

userCentroMensajes.addEventListener('input', () => {
    let hayEmail = userCentroMensajes.value.length
    let hayTexto = textoCentroMensajes.value.length
    textoCentroMensajes.disabled = !hayEmail
    botonCentroMensajes.disabled = !hayEmail || !hayTexto
})

textoCentroMensajes.addEventListener('input', () => {
    let hayTexto = textoCentroMensajes.value.length
    botonCentroMensajes.disabled = !hayTexto
})