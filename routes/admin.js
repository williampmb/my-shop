const express = require("express");
const adminController = require("../controllers/admin");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/edit-product/:id", isAuth, adminController.getProductForEditing);
router.post("/add-product", isAuth, adminController.addProduct);
router.post("/edit-product", isAuth, adminController.editProduct);
router.delete("/delete-product/:id", isAuth, adminController.deleteProduct);
router.get("/products", isAuth, adminController.getProducts);

module.exports = router;
