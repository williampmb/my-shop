const Product = require("../models/product");

exports.addProduct = (req, response, next) => {
  console.log("SAVING PRODUCT OF USER ID: ", req.user._id);
  const title = req.body.title;
  const image_url = req.body.imgUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(
    title,
    price,
    description,
    image_url,
    null,
    req.user._id
  );
  product
    .save()
    .then(() => {
      response.status(200).send();
      console.log("sucess");
    })
    .catch((err) => console.log(err));
};

exports.getProducts = (request, response, next) => {
  Product.fetchAll()
    .then((result) => {
      response.status(200).json(result);
    })
    .catch((err) => console.log(err));
};

exports.editProduct = (request, response, next) => {
  console.log("Get product for editing");

  const id = request.body.id;
  const title = request.body.title;
  const imgUrl = request.body.imgUrl;
  const price = request.body.price;
  const description = request.body.description;

  const updatedProduct = new Product(title, price, description, imgUrl, id);

  updatedProduct
    .save()
    .then((result) => {
      console.log("UPDATE");
      response.status(200).send({});
    })
    .catch((err) => console.log(err));
};

exports.getProductForEditing = (request, response, next) => {
  const id = request.params.id;
  Product.findById(id)
    .then((product) => response.status(200).send(product))
    .catch();
};

exports.deleteProduct = (request, response, next) => {
  const id = request.params.id;

  Product.deleteByid(id)
    .then((result) => {
      console.log("Destroyed Product:", id);
      response.status(200).send();
    })
    .catch((err) => {
      console.log(err);
    });
};
