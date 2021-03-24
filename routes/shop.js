const express = require("express");
const shopController = require("../controllers/shop");

const router = express.Router();

/*router.post("/create-order", shopController.postOrder);*/
router.get("/cart", shopController.getCart);
router.post("/cart", shopController.postCart);
router.post("/delete-cart-item", shopController.deleteCartItem);
/*router.get("/checkout", shopController.getCheckout);
router.get("/orders", shopController.getOrders);*/
router.get("/products", shopController.getProducts);
router.get("/", shopController.getIndex);
router.get("/product/:id", shopController.getProductId);

module.exports = router;
