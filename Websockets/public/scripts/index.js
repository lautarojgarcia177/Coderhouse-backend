// Virtual DOM (?
const inputNombre = document.getElementById('nombre');
const inputPrecio = document.getElementById('precio');
const inputFoto = document.getElementById('foto');
const buttonSubmit = document.getElementById('submitBtn');

buttonSubmit.addEventListener('click', () => {
    const nuevoProducto = {
        title: inputNombre.value,
        price: inputPrecio.value,
        thumbnail: inputFoto.value
    }
});