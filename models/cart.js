const fs = require("fs");
const path = require("path");

const p = path.join(path.dirname(require.main.filename), "data", "cart.json");
module.exports = class Cart {
  static addProduct(id, productPrice) {
    // fetch data from cart
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      // check the cart for the product
      const existProductIndex = cart.products.findIndex(
        (prod) => prod.id === id
      );
      const existProduct = cart.products[existProductIndex];
      let updateProduct;
      // add new product / increase quantity
      if (existProduct) {
        updateProduct = { ...existProduct };
        updateProduct.qty = updateProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existProductIndex] = updateProduct;
      } else {
        updateProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updateProduct];
      }

      cart.totalPrice = cart.totalPrice + +productPrice; //second + transform into number to sum
      cart.products = [...cart.products];

      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }
};
