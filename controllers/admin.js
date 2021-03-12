const Product = require("../models/product");

exports.addProduct = (req, res, next) => {
  console.log(req.body);
  const title = req.body.title;
  const imgUrl = req.body.imgUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, imgUrl, price, description);
  product.save();
  res.status(200).send({});
};

exports.getProducts = (request, response, next) => {
  Product.fetchAll((products) => {
    console.log(products);
    response.status(200).json(products);
  });
};
