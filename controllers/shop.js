const Product = require("../models/product");
const User = require("../models/user");
const Order = require("../models/order");

exports.getIndex = (request, response, next) => {
  console.log("CALLING GETINDEX SHOP CONTROLLER");
  Product.find()
    .then((result) => {
      response.status(200).send({ result });
    })
    .catch((err) => console.log(err));
};

exports.getProducts = (request, response, next) => {
  Product.find()
    .then((result) => {
      response.status(200).send({ result });
    })
    .catch((err) => console.log(err));
};
exports.getProductId = (request, response, next) => {
  const productId = request.params.id;
  Product.findById(productId)
    .then((result) => {
      response.status(200).send({ result });
    })
    .catch();
};

exports.getOrders = (request, response, next) => {
  Order.find({ "user.userId": request.userId })
    .then((orders) => response.status(200).send({ result: orders }))
    .catch((err) => console.log(err));
};

exports.getCart = (request, response, next) => {
  User.findById(request.userId)
    .then((user) => {
      return user.populate("cart.items.productId").execPopulate();
    })
    .then((user) => {
      console.log(user);
      const products = user.cart.items;
      response.status(200).send({ result: products });
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

exports.postCart = (request, response, next) => {
  const productId = request.body.id;
  Product.findById(productId)
    .then((product) => {
      return request.user.addToCart(product);
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
