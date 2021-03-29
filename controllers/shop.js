const Product = require("../models/product");
const User = require("../models/user");
const Order = require("../models/order");

exports.getIndex = (req, response, next) => {
  Product.find()
    .then((result) => {
      response.status(200).send({ result, csrfToken: req.csrfToken() });
    })
    .catch((err) => console.log(err));
};

exports.getProducts = (request, response, next) => {
  Product.find()
    .then((result) => {
      response.status(200).send({ result, csrfToken: req.csrfToken() });
    })
    .catch((err) => console.log(err));
};
exports.getProductId = (request, response, next) => {
  const productId = request.params.id;
  Product.findById(productId)
    .then((result) => {
      response.status(200).send({ result, csrfToken: req.csrfToken() });
    })
    .catch();
};

exports.getOrders = (request, response, next) => {
  Order.find({ "user.userId": request.user._id })
    .then((orders) =>
      response
        .status(200)
        .send({ result: orders, csrfToken: request.csrfToken() })
    )
    .catch((err) => console.log(err));
};

exports.getCart = (req, response, next) => {
  req.user
    .populate("cart.items.productId")
    .execPopulate()
    .then((user) => {
      const products = user.cart.items;
      response
        .status(200)
        .send({ result: products, csrfToken: req.csrfToken() });
    })
    .catch((err) => console.log(err));
};

exports.deleteCartItem = (request, response, next) => {
  const prodId = request.body.id;
  console.log("id from cart to be removed", prodId);
  request.user
    .removeFromCart(prodId)
    .then((result) => {
      response.status(200).send();
    })
    .catch((err) => console.log(err));
};

exports.postCart = (req, response, next) => {
  const productId = req.body.id;
  Product.findById(productId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => {
      response.status(200).send();
    })
    .catch((err) => console.log(err));
};

exports.postOrder = (request, response, next) => {
  request.user
    .populate("cart.items.productId")
    .execPopulate()
    .then((user) => {
      const products = user.cart.items.map((i) => {
        return { quantity: i.quantity, product: { ...i.productId._doc } };
      });
      const order = new Order({
        user: { name: request.user.email, userId: request.user },
        products: products,
      });
      return order.save();
    })
    .then(() => {
      return request.user.clearCart();
    })
    .then(() => {
      response.status(200).send();
    })
    .catch((err) => console.log(err));
};
