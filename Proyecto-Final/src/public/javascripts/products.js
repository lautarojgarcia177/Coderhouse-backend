fetch('/api/products', {
    headers: {
        'Authorization': 'bearer ' + getCookie('accessToken')
    }
})
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(err => console.error(err))