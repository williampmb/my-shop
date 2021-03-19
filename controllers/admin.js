const Product = require("../models/product");

exports.addProduct = (req, res, next) => {
  console.log(req.body);
  const title = req.body.title;
  const imgUrl = req.body.imgUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null, title, imgUrl, price, description);
  product.save();
  res.status(200).send({});
};

exports.getProducts = (request, response, next) => {
  Product.fetchAll((products) => {
    response.status(200).json(products);
  });
};

exports.editProduct = (request, response, next) => {
  console.log("Get product for editing");

  const id = request.body.id;
  const title = request.body.title;
  const imgUrl = request.body.imgUrl;
  const price = request.body.price;
  const description = request.body.description;

  let editedProduct = new Product(id, title, imgUrl, price, description);
  console.log({ id, title, imgUrl, price, description });
  editedProduct.save();
  res.status(200).send({});
};

exports.getProductForEditing = (request, response, next) => {
  const id = request.params.id;

  Product.findById(id, (product) => {
    console.log("Edit Product:", product);
    const id = request.params.id;
    response.status(200).send(product);
  });
};
