const Product = require("../models/product");
const User = require("../models/user");
const Order = require("../models/order");

exports.getProducts = (request, response, next) => {
  Product.find()
    .then((result) => {
      console.log("RESULT FROM GET PRODUCTS", result);

      response.status(200).json(result);
    })
    .catch((err) => console.log(err));
};
exports.getProductId = (request, response, next) => {
  const productId = request.params.id;

  Product.findById(productId)
    .then((data) => {
      response.status(200).send(data);
    })
    .catch();
};

exports.getOrders = (request, response, next) => {
  Order.find({ "user.userId": request.user._id })
    .then((orders) => response.status(200).json(orders))
    .catch((err) => console.log(err));
};

exports.getIndex = (req, response, next) => {
  Product.find()
    .then((result) => {
      console.log("RESULT FROM GET INDEX", result);
      response.status(200).json(result);
    })
    .catch((err) => console.log(err));
};

exports.getCart = (req, response, next) => {
  req.user
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

  /* let fetchedCart;
  let updatedQuantity = 1;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: productId } });
    })
    .then((products) => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }
      if (product) {
        const curQuantity = product.cartItem.quantity;
        updatedQuantity += curQuantity;
        return product;
      }
      return Product.findByPk(productId);
    })
    .then((product) => {
      fetchedCart.addProduct(product, {
        through: { quantity: updatedQuantity },
      });

      response.status(200).send();
    })
    .catch((err) => console.log(err));*/
};
exports.getCheckout = (req, response, next) => {
  response.status(200).json({ title: "MyCheckout" });
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
        user: { name: request.user.name, userId: request.user },
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
