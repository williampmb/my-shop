const Product = require("../models/product");

exports.getProducts = (request, response, next) => {
  Product.findAll({ raw: true })
    .then((result) => {
      console.log("RESULT FROM GET PRODUCTS", result);

      response.status(200).json(result);
    })
    .catch((err) => console.log(err));
};
exports.getProductId = (request, response, next) => {
  const productId = request.params.id;

  Product.findByPk(productId)
    .then((data) => {
      response.status(200).send(data);
    })
    .catch();
};

exports.getOrders = (request, response, next) => {
  request.user
    .getOrders({ include: ["products"] })
    .then((order) => response.status(200).json(order))
    .catch((err) => console.log(err));
};

exports.getIndex = (req, response, next) => {
  Product.findAll({ raw: true })
    .then((result) => {
      console.log("RESULT FROM GET INDEX", result);
      response.status(200).json(result);
    })
    .catch((err) => console.log(err));
};

exports.getCart = (req, response, next) => {
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts().then((products) => {
        response.status(200).json(products);
      });
    })
    .catch((err) => console.log(err));
};

exports.deleteCartItem = (request, response, next) => {
  const prodId = request.body.id;

  request.user
    .getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      const product = products[0];
      return product.cartItem.destroy();
    })
    .then((result) => {
      response.status(200).send();
    })
    .catch((err) => console.log(err));
};

exports.postCart = (req, response, next) => {
  const productId = req.body.id;
  let fetchedCart;
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
    .catch((err) => console.log(err));
};
exports.getCheckout = (req, response, next) => {
  response.status(200).json({ title: "MyCheckout" });
};

exports.postOrder = (request, response, next) => {
  let updatedCart;
  request.user
    .getCart()
    .then((cart) => {
      updatedCart = cart;
      return cart.getProducts();
    })
    .then((products) => {
      return request.user.createOrder().then((order) =>
        order.addProducts(
          products.map((product) => {
            product.orderItem = { quantity: product.cartItem.quantity };
            return product;
          })
        )
      );
    })
    .then((result) => {
      updatedCart.setProducts(null);
    })
    .then((result) => {
      response.status(200).send();
    })
    .catch((err) => console.log(err));
};
