const express = require("express");
const shopController = require("../controllers/shop");
const isAuth = require("../middleware/is-auth");
const router = express.Router();

router.post("/create-order", isAuth, shopController.postOrder);
router.get("/cart", isAuth, shopController.getCart);
router.post("/cart", isAuth, shopController.postCart);
router.post("/delete-cart-item", isAuth, shopController.deleteCartItem);
router.get("/orders", isAuth, shopController.getOrders);
router.get("/products", isAuth, shopController.getProducts);
router.get("/", shopController.getIndex);
router.get("/product/:id", shopController.getProductId);

module.exports = router;
