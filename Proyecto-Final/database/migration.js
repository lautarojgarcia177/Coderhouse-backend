// Migrate products
const Product = require("../models/product");
const products = require("./products.json");
const MongoCRUD = require("../repository/crud");

const productsDAO = new MongoCRUD(Product);
async function migrateProducts() {
    for(product of products) {
        await productsDAO.create(product);
    }
};
migrateProducts().then(() => console.log('Products migrated'));

// Migrate carts
// const Cart = require("../models/cart");
// const carts = require("./carts.json");
// Cart.create(carts).then(() => console.log("carts migrated"));


