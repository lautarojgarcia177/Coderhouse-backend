let accessToken = 'yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTdiNjcxZWZmODY5ZTI5N2NmNGJiMzIiLCJpYXQiOjE2MzU3MDQ4MTEsImV4cCI6MTYzNTcwNjYxMSwidHlwZSI6ImFjY2VzcyJ9.IHLncWKYdNsp2tFh37GjacSZQfvd1bzhTLcfPHZkpkg';
let refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTdiNjcxZWZmODY5ZTI5N2NmNGJiMzIiLCJpYXQiOjE2MzU3MDQ4MTEsImV4cCI6MTYzODI5NjgxMSwidHlwZSI6InJlZnJlc2gifQ.NqhHW0EIn3RGnOfVx4nsn8l2547WWuShBLrWMO4KPHU';
let broadcastChannel = new BroadcastChannel('sw_channel');

self.addEventListener('activate', (e) => {
  e.waitUntil(
    cleanCache()
  );
  broadcastChannel.onmessage = (event) => {
    accessToken = event.data.accessToken;
    refreshToken = event.data.refreshToken;
  };
});

self.addEventListener('fetch', function(event) {
  console.log(event.request);
  event.respondWith(
    fetchWithAuthentication(event.request)
  );
});

async function fetchWithAuthentication(request) {
  let requestBody;
  request.body.getReader().read().then(function processText({done, value}) {
    if (done) {
      requestBody = value;
      console.log(requestBody);
    }
  });
  const reqWithHeader = appendAuthHeader(request);
  console.log('request from sw', reqWithHeader);
  const response = await fetch(reqWithHeader);
  return response;
}

appendAuthHeader = (originalRequest) => new Request(originalRequest, {
  headers: {
    ...originalRequest.headers,
    Authorization: 'bearer ' + accessToken
  }
});

function cleanCache() {
  caches.keys().then(keyList => {
    return Promise.all(keyList.map((key) => {
      if (cacheKeepList.indexOf(key) === -1) {
        return caches.delete(key);
      }
    }));
  });
}