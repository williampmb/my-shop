const Product = require("../models/product");
const Cart = require("../models/cart");
exports.getProducts = (request, response, next) => {
  Product.fetchAll((products) => {
    response.status(200).json(products);
  });
};
exports.getProductId = (request, response, next) => {
  const productId = request.params.id;

  Product.findById(productId, (product) => {
    console.log(product);
    response.status(200).send(product);
  });
};

exports.getOrders = (request, response, next) => {
  response.status(200).json({ title: "Orders" });
};

exports.getIndex = (req, response, next) => {
  Product.fetchAll((products) => {
    response.status(200).json(products);
  });
};

exports.getCart = (req, response, next) => {
  response.status(200).json({ title: "MyCart" });
};

exports.postCart = (req, response, next) => {
  const productId = req.body.id;
  Product.findById(productId, (product) => {
    Cart.addProduct(productId, product.price);
  });
  console.log(productId);
  response.status(200).send();
};
exports.getCheckout = (req, response, next) => {
  response.status(200).json({ title: "MyCheckout" });
};
