const formElement = document.querySelector('form');
const broadcastChannel = new BroadcastChannel('sw_channel');

formElement.addEventListener('submit', function(event) {
  event.preventDefault();
  const formData = new FormData(formElement);
});
formElement.addEventListener('formdata', e => {
  const formData = {
    email: e.formData.get('email'),
    password: e.formData.get('password')
  };
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
  };
  fetch('api/auth/login', fetchOptions)
    .then(async res => {
      const responseBody = await res.json();
      if (res.ok) {
        // Set token cookies
        const accessToken = responseBody.tokens.access;
        accessToken.expires = new Date(accessToken.expires);
        accessToken.expires = accessToken.expires.toUTCString();
        setCookie('accessToken', accessToken.token, accessToken.expires);
        const refreshToken = responseBody.tokens.refresh;
        refreshToken.expires = new Date(refreshToken.expires);
        refreshToken.expires = refreshToken.expires.toUTCString();
        setCookie('refreshToken', refreshToken.token, refreshToken.expires);
        // send tokens to service worker via broadcastChannel
        broadcastChannel.postMessage({
          accessToken: accessToken.token,
          refreshToken: refreshToken.token
        });
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

document.querySelector('#loginAlert').classList.add('d-none');
const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('error');
if(myParam == "Requires_auth") {
  document.querySelector('#loginAlert').classList.remove('d-none');
}9