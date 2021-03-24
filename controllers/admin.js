const Product = require("../models/product");

exports.addProduct = (req, response, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imgUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product({
    title,
    price,
    description,
    imageUrl,
    userId: req.user,
  });
  product
    .save()
    .then(() => {
      response.status(200).send();
      console.log("sucess");
    })
    .catch((err) => console.log(err));
};

exports.getProducts = (request, response, next) => {
  Product.find()
    // .select("title price -_id")
    // .populate("userId", "name")
    .then((result) => {
      response.status(200).json(result);
    })
    .catch((err) => console.log(err));
};

exports.editProduct = (request, response, next) => {
  const id = request.body.id;
  const title = request.body.title;
  const imgUrl = request.body.imgUrl;
  const price = request.body.price;
  const description = request.body.description;

  Product.findById(id)
    .then((product) => {
      product.title = title;
      product.imageUrl = imgUrl;
      product.price = price;
      product.description = description;
      return product.save();
    })
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

  Product.findByIdAndRemove(id)
    .then((result) => {
      response.status(200).send();
    })
    .catch((err) => {
      console.log(err);
    });
};
