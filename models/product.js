const fs = require("fs");
const path = require("path");

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
      callback(product);
    });
  }
}

module.exports = Product;
