const formElement = document.querySelector('form');
formElement.addEventListener('submit', function(event) {
  event.preventDefault();
  const formData = new FormData(formElement);
});
formElement.addEventListener('formdata', e => {
  const formData = {
    email: e.formData.get('email'),
    password: e.formData.get('password')
  };
  fetch('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(async res => {
      const responseBody = await res.json();
      // Set token cookies
      const accessToken = responseBody.tokens.access;
      accessToken.expires = new Date(accessToken.expires);
      accessToken.expires = accessToken.expires.toUTCString();
      document.cookie = `access-token=${accessToken.token}; expires=${accessToken.expires}`;
      const refreshToken = responseBody.tokens.refresh;
      refreshToken.expires = new Date(refreshToken.expires);
      refreshToken.expires = refreshToken.expires.toUTCString();
      document.cookie = `refresh-token=${refreshToken.token}; expires=${refreshToken.expires}`;
    })
    .catch(err => console.warn);
});