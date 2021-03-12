const { Router } = require("express");
const express = require("express");
const adminController = require("../controllers/admin");

const router = express.Router();

router.post("/add-product", adminController.addProduct);
router.get("/products", adminController.getProducts);

module.exports = router;
