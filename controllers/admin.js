const Product = require("../models/product");

exports.addProduct = (req, res, next) => {
  console.log(req.body);
  const title = req.body.title;
  const image_url = req.body.imgUrl;
  const price = req.body.price;
  const description = req.body.description;
  req.user
    .createProduct({ title, price, image_url: image_url, description })
    .then((res) => {
      console.log("sucess");
    })
    .catch((err) => console.log(err));
};

exports.getProducts = (request, response, next) => {
  request.user
    .getProducts()
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

  Product.findByPk(id)
    .then((prod) => {
      prod.title = title;
      prod.price = price;
      prod.image_url = imgUrl;
      prod.description = description;
      return prod.save();
    })
    .then((result) => {
      console.log("UPDATE");
      response.status(200).send({});
    })
    .catch((err) => console.log(err));
};

exports.getProductForEditing = (request, response, next) => {
  const id = request.params.id;
  request.user
    .getProducts({ where: { id: id } })
    // Product.findByPk(id)
    .then((result) => response.status(200).send(result[0]))
    .catch();
};

exports.deleteProduct = (request, response, next) => {
  const id = request.params.id;

  Product.findByPk(id)
    .then((product) => {
      return product.destroy();
    })
    .then((result) => {
      response.status(200).send();
      console.log("Destroyed Product:", id);
    })
    .catch((err) => {
      console.log(err);
    });
};
