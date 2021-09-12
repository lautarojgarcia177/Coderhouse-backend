var express = require("express");
var { graphqlHTTP } = require("express-graphql");
var graphql = require("graphql");
var fs = require("fs");

var products = JSON.parse(fs.readFileSync("products.json", "utf8"));

var productType = new graphql.GraphQLObjectType({
  name: "Product",
  fields: {
    id: { type: graphql.GraphQLInt },
    title: { type: graphql.GraphQLString },
    price: { type: graphql.GraphQLFloat },
    thumbnail: { type: graphql.GraphQLString },
  },
});


var queryType = new graphql.GraphQLObjectType({
  name: "Query",
  fields: {
    product: {
      type: productType,
      args: {
        id: { type: graphql.GraphQLInt },
      },
      resolve: (_, { id }) => {
        return products.find((product) => product.id == id);
      },
    },
  },
});

var schema = new graphql.GraphQLSchema({ query: queryType });

var app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);
app.listen(4000);
console.log("Running a GraphQL API server at localhost:4000/graphql");
