const fs = require("fs");
const path = require("path");
const Cart = require("./cart");
const products = [];

const p = path.join(
  path.dirname(require.main.filename),
  "data",
  "products.json"
);

const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

class Product {
  constructor(id, title, imageUrl, price, description) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  save() {
    getProductsFromFile((products) => {
      let updatedArray = [...products];
      if (!this.id) {
        this.id = Math.floor(Math.random() * 100000).toString();
        updatedArray.push(this);
      } else {
        let indexProduct = products.findIndex((prod) => prod.id === this.id);
        updatedArray[indexProduct] = this;
      }
      fs.writeFile(p, JSON.stringify(updatedArray), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, callback) {
    getProductsFromFile((products) => {
      const product = products.find((p) => p.id === id);
      if (!product) {
        console.log("Product not found");
        return;
      }
      callback(product);
    });
  }

  static deleteById(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((prod) => prod.id === id);
      const newList = products.filter((prod) => prod.id !== id);
      fs.writeFile(p, JSON.stringify(newList), (err) => {
        if (!err) {
          console.log("deleting product");
          Cart.deleteProduct(id, product.price);
          cb(200);
        }
        console.log(err);
      });
    });
  }
}

module.exports = Product;
