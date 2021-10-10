function addToCart(productId) {

    fetch('/carts/addProduct/' + productId, {
        method: 'PATCH'
    }).then(x => {
        window.location.reload();
    });
}