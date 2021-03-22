const fs = require("fs");
const path = require("path");
const Product = require("./product");

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

  static deleteProduct(id, price) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return;
      }

      const updatedCart = { ...JSON.parse(fileContent) };
      console.log("a:", id);
      const cartProduct = updatedCart.products.find((prod) => prod.id === id);
      if (!cartProduct || cartProduct.length === 0) {
        console.log("b", cartProduct);
        return;
      }

      updatedCart.products = updatedCart.products.filter(
        (prod) => prod.id !== id
      );
      updatedCart.totalPrice -= price * cartProduct.qty;
      console.log("new product ");
      fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
        console.log(err);
      });
    });
  }

  static loadCart(cb) {
    fs.readFile(p, (err, fileContent) => {
      const cart = JSON.parse(fileContent);
      console.log("Cart Loaded:", cart);
      if (err) {
        cb(null);
      } else {
        cb(cart);
      }
    });
  }
};
