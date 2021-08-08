try {
    const btnDesloguear = document.querySelector('#btn__desloguear');
    btnDesloguear.addEventListener('click', function() {
        const username = document.querySelector('#span__username').innerHTML;
        const request = new Request('/api/desloguear', {
            method: 'GET',
        });
    
        fetch(request).then(() => {
            document.querySelector('#span__saludo').innerHTML = 'Hasta luego';
            setTimeout(() => {
                window.location.reload();
            }, 2000)
        });
    });
} catch {}