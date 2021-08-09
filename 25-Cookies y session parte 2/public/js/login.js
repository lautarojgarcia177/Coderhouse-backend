const loginForm = document.getElementById('form__login')
loginForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.querySelector('#input__username').value;
    
    const request = new Request('/api/login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: `{ "username": "${username}"}`
    });

    fetch(request).then(() => {
        window.location.href="/mvc";
    });

})