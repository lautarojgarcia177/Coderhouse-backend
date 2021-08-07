// window.fbAsyncInit = function () {
//   FB.init({
//     appId: "{your-app-id}",
//     cookie: true,
//     xfbml: true,
//     version: "{api-version}",
//   });

//   FB.AppEvents.logPageView();
// };

// (function (d, s, id) {
//   var js,
//     fjs = d.getElementsByTagName(s)[0];
//   if (d.getElementById(id)) {
//     return;
//   }
//   js = d.createElement(s);
//   js.id = id;
//   js.src = "https://connect.facebook.net/en_US/sdk.js";
//   fjs.parentNode.insertBefore(js, fjs);
// })(document, "script", "facebook-jssdk");

try {
  const btnDesloguear = document.querySelector("#btn__desloguear");
  btnDesloguear.addEventListener("click", function () {
    const username = document.querySelector("#span__username").innerHTML;
    const request = new Request("/api/desloguear", {
      method: "GET",
    });

    fetch(request).then(() => {
      document.querySelector("#span__saludo").innerHTML = "Hasta luego";
      setTimeout(() => {
        window.location.href = "/mvc/login";
      }, 2000);
    });
  });
} catch {}
