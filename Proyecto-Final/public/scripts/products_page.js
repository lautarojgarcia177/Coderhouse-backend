function addToCart(productId) {

    fetch('/carts/addProduct', {
        method: 'POST',
        body: JSON.stringify({ productId: productId })
    }).then(x => console.log(x));
}