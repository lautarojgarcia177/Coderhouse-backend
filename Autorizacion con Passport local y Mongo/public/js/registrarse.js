const registrarseForm = document.getElementById('form__registrarse')
registrarseForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.querySelector('#input__username').value;
    const password = document.querySelector('#input__password').value;
    
    const request = new Request('/auth/registrarse', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: `{ "username": "${username}", "password": "${password}" }`
    });

    fetch(request).then(() => {
        window.location.href="/mvc";
    });

})