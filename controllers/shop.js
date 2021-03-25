const Product = require("../models/product");
const User = require("../models/user");
const Order = require("../models/order");

exports.getProducts = (request, response, next) => {
  console.log("SESSION GET PRODUCTS", request.session);
  Product.find()
    .then((result) => {
      console.log("RESULT FROM GET PRODUCTS", result);

      response.status(200).json(result);
    })
    .catch((err) => console.log(err));
};
exports.getProductId = (request, response, next) => {
  const productId = request.params.id;
  console.log("SESSION IN PRODUCT ID ", request.session);
  Product.findById(productId)
    .then((data) => {
      response.status(200).send(data);
    })
    .catch();
};

exports.getOrders = (request, response, next) => {
  Order.find({ "user.userId": request.session.user._id })
    .then((orders) => response.status(200).json(orders))
    .catch((err) => console.log(err));
};

exports.getIndex = (req, response, next) => {
  console.log("SESSION GET INDEX", req.session);

  /* response.setHeader("Access-Control-Allow-Origin: http://localhost:3001/");
  response.setHeader("Access-Control-Allow-Credentials: true");
  response.setHeader("Access-Control-Allow-Methods: GET, POST");
  response.setHeader("Access-Control-Allow-Headers: Content-Type, *");*/
  response.setHeader("Set-Cookie", "abcdes");
  Product.find()
    .then((result) => {
      response.status(200).json(result);
    })
    .catch((err) => console.log(err));
};

exports.getCart = (req, response, next) => {
  req.session.user
    .populate("cart.items.productId")
    .execPopulate()
    .then((user) => {
      const products = user.cart.items;
      console.log("CART PRODUCTS", products);
      response.status(200).json(products);
    })
    .catch((err) => console.log(err));
};

exports.deleteCartItem = (request, response, next) => {
  const prodId = request.body.id;
  console.log("id from cart to be removed", prodId);
  request.session.user
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
      return req.session.user.addToCart(product);
    })
    .then((result) => {
      response.status(200).send();
    })
    .catch((err) => console.log(err));
};
exports.getCheckout = (req, response, next) => {
  response.status(200).json({ title: "MyCheckout" });
};

exports.postOrder = (request, response, next) => {
  request.session.user
    .populate("cart.items.productId")
    .execPopulate()
    .then((user) => {
      const products = user.cart.items.map((i) => {
        return { quantity: i.quantity, product: { ...i.productId._doc } };
      });
      const order = new Order({
        user: { name: request.session.user.name, userId: request.session.user },
        products: products,
      });
      return order.save();
    })
    .then(() => {
      return request.session.user.clearCart();
    })
    .then(() => {
      response.status(200).send();
    })
    .catch((err) => console.log(err));
};
