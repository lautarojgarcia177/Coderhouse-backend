const loggedGreetingEl = document.querySelector('#loggedInGreeting');
const logoutEl = document.querySelector('#logout');
let relocationFlag = false;

if (logoutEl) {
  logoutEl.addEventListener('click', e => {
    e.preventDefault();
    const body = {
      refreshToken: getCookie('refreshToken')
    };
    fetch('/api/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
  });
}

function checkAuth() {
  const body = {
    accessToken: getCookie('accessToken') || 'invalid.token.placeholder',
    refreshToken: getCookie('refreshToken') || 'invalid.token.placeholder',
  }
  fetch('/api/auth/verify-tokens', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  .then(response => response.json())
  .then(data => {
    if (Boolean(data.areTokensValid)) {
      switch(window.location.pathname) {
        case '/':
          window.location.href = '/products';
      }
    } else {
      window.location.href = '/login?error=Requires_auth';
    }
  })
  .catch(err => console.error(err))
}

if (!window.location.pathname.includes('login') && !window.location.pathname.includes('register')) {
  checkAuth();
}