var express = require("express");
var { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql");
var fs = require("fs");

var products = JSON.parse(fs.readFileSync("products.json", "utf8"));

var schema = buildSchema(`
type Query {
  product(id: Int!): Product,
  products: [Product]  
},
type Mutation {
  insertProduct(id: Int!, title: String, price: Float, thumbnail: String): Product
},
type Product {
  id: Int
  title: String
  price: Float
  thumbnail: String
}
`);


var getProductById = function (args) {
  var id = args.id;
  return products.find((product) => product.id == id);
};

var insertProduct = function ({ id, title, thumbnail, price }) {
  let product = { id, title, thumbnail, price };
  products.push(product);
  return product;
};

var root = {
  product: getProductById,
  products: () => products,
  insertProduct: insertProduct
};

var app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.put('/rest/products/update/:id', (req, res, next) => {
  let productToUpdate = products.find(product => product.id == req.params.id );
  Object.assign(productToUpdate, req.body);
  res.json(productToUpdate);
});

app.delete('/rest/products/delete/:id', (req, res, next) => {
  products = products.filter(product => product.id != req.params.id);
  res.send('Producto eliminado con éxito');
});

app.listen(4000);
