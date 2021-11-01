const logoutEl = document.querySelector('#logout');
if (logoutEl) {
  logoutEl.addEventListener('click', e => {
    e.preventDefault();
    const body = {
      refreshToken: getCookie('refreshToken')
    };
    console.log(body);
    fetch('/api/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
  });
}
