const Product = require("../models/product");
const Cart = require("../models/cart");
exports.getProducts = (request, response, next) => {
  Product.fetchAll((products) => {
    response.status(200).json(products);
  });
};
exports.getProductId = (request, response, next) => {
  console.log("Get Product Id");
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
  Cart.loadCart((cart) => {
    Product.fetchAll((products) => {
      console.log("numb prod:", products.length);

      let myCart = [];
      for (let item of cart.products) {
        for (let prod of products) {
          if (item.id === prod.id) {
            myCart.push({ prod, qty: item.qty });
            break;
          }
        }
      }
      console.log("wholecart:", cart.length);
      console.log("resp", myCart);
      console.log("CART in getCart ", myCart);
      response.status(200).json(myCart);
    });
  });
};

exports.deleteCartItem = (request, response, next) => {
  const prodId = request.body.id;
  Product.findById(prodId, (product) => {
    Cart.deleteProduct(prodId, product.price);
    response.status(200).send();
  });
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
