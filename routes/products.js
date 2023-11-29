const express = require('express');
const productController = require('../controllers/products');
const auth = require("../auth");

const {verify, verifyAdmin } = auth;

const router = express.Router();

// Regular User side
router.get('/', productController.retrieveAllProduct);
router.get('/retrieve-active', verify, productController.retrieveActiveProducts);
router.get('/:productId', productController.retrieveSingleProduct);



// Admin User side
// [Section] Create New Product
router.post('/addProduct', verify, verifyAdmin, productController.createNewProduct);
router.put('/:productId', verify,verifyAdmin, productController.updateProdInfo);
router.patch('/:productId/archive', verify,verifyAdmin, productController.archivedProd);
router.patch('/:productId/activate', verify,verifyAdmin, productController.activateProd);


//Testing COnnectione
router.get("/testingProduct", productController.testingProduct)

module.exports = router;