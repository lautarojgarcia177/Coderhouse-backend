const formElement = document.querySelector('form');
formElement.addEventListener('submit', function(event) {
  event.preventDefault();
  const formData = new FormData(formElement);
});
formElement.addEventListener('formdata', e => {
  const formData = {
    name: e.formData.get('name'),
    email: e.formData.get('email'),
    password: e.formData.get('password')
  };
  fetch('api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(async res => {
        const responseBody = await res.json();
      if (res.ok) {
        // Set token cookies
        const accessToken = responseBody.tokens.access;
        accessToken.expires = new Date(accessToken.expires);
        accessToken.expires = accessToken.expires.toUTCString();
        document.cookie = `access-token=${accessToken.token}; expires=${accessToken.expires}`;
        const refreshToken = responseBody.tokens.refresh;
        refreshToken.expires = new Date(refreshToken.expires);
        refreshToken.expires = refreshToken.expires.toUTCString();
        document.cookie = `refresh-token=${refreshToken.token}; expires=${refreshToken.expires}`;
        window.location.href = '/';
      } else {
        const alertElement = document.createElement('div');
        alertElement.classList.add('alert');
        alertElement.classList.add('alert-danger');
        alertElement.innerHTML = `${res.status} - ${res.statusText}: ${responseBody.message}`;
        document.body.appendChild(alertElement);
      }
    })
    .catch(err => console.warn);
});