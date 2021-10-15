// @deno-types="https://deno.land/x/servest@v1.3.1/types/react/index.d.ts"
import React from "https://dev.jspm.io/react/index.js";
// @deno-types="https://deno.land/x/servest@v1.3.1/types/react-dom/server/index.d.ts"
import ReactDOMServer from "https://dev.jspm.io/react-dom/server.js";
import { createApp } from "https://deno.land/x/servest@v1.3.1/mod.ts";

const app = createApp();
let colores: Array<any> = [];
let coloresAMostrar: any;

function actualizarColores(color: any) {
    colores.push(color);
    coloresAMostrar = colores.map((color) => <li>{color}</li>);
}

app.handle("/", async (req) => {
  await req.respond({
    status: 200,
    headers: new Headers({
      "content-type": "text/html; charset=UTF-8",
    }),
    body: ReactDOMServer.renderToString(
      <html>
        <head>
          <meta charSet="utf-8" />
          <title>servest</title>
        </head>
        <body>
          <h1>Seleccione el color</h1>
          <form action="/color" method="post">
              <input type="color"></input>
              <input type="submit"></input>
          </form>
            <ul>
                {coloresAMostrar}
            </ul>
        </body>
      </html>
    ),
  });
});

app.handle("/color", async(req) => {
    actualizarColores(req.body);
});

app.listen({ port: 8899 });