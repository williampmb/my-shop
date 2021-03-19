const { Router } = require("express");
const express = require("express");
const adminController = require("../controllers/admin");

const router = express.Router();

router.get("/edit-product/:id", adminController.getProductForEditing);
router.post("/add-product", adminController.addProduct);
router.post("/edit-product", adminController.editProduct);
router.get("/products", adminController.getProducts);

module.exports = router;
