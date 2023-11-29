const express = require('express');
const orderRoute = require('../controllers/orders')
const auth = require("../auth");


const {verify, verifyAdmin } = auth;

const router = express.Router();


// Regular User side
router.patch("/add-product",verify, orderRoute.addedProducts);
router.get("/remove-product",verify, orderRoute.removedProduct);
router.patch("/add-cart-quantity", verify, orderRoute.changeQuantity);
router.get("/subtotal-total", verify, orderRoute.subTotalPrice);



//extra goal
// [will delete users orders and save it on reciept]
router.get("/:orderId/produce-reciept", verify, verifyAdmin, orderRoute.produceReciept);





module.exports = router;