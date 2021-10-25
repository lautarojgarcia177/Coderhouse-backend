function confirmPurchase() {
    fetch('/confirmPurchase/').then(x => {
        window.location.replace('/purchaseConfirmed');
    });
}