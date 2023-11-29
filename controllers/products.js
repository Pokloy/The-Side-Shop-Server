const Product = require("../models/Products");
const Order = require("../models/Order");
const Reciept = require("../models/Reciept");
const bcrypt = require("bcrypt");
const auth = require("../auth");


module.exports.createNewProduct = (req,res) => {

	let newProduct = new Product({
		name: req.body.name.replace(/[A-Z]/g, match => match.toLowerCase()),
		img: req.body.img,
		price: req.body.price,
		quantity: req.body.quantity,
		isActive: req.body.isActive
	})
	
	return newProduct.save().then((product,error) => {
		if(error){
			console.log("No Product Added");
			return res.send(false);
		} else {
			console.log("New Product Added");
			return res.send(true);
		}
	})
}

module.exports.testingProduct = async (req,res) => {
	return res.send("Product Connection Success");
}



module.exports.retrieveAllProduct = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.send(products);
  } catch (error) {
    console.error("Error retrieving products:", error);
    return res.status(500).send("Error retrieving products: " + error.message);
  }
};

module.exports.retrieveActiveProducts = async (req, res) => {
  try {
    const products = await Product.find({ isActive: true });
    return res.send(products);
  } catch (error) {
    console.error("Error retrieving active products:", error);
    return res.status(500).send("Error retrieving active products: " + error.message);
  }
};

module.exports.retrieveSingleProduct = async (req, res) => {
	const productId = req.params.productId;
	try{
			let productSingle = await Product.findById({_id:productId})
		if(productSingle === null){
			return res.send(false);
		} else {
			return res.send(productSingle);
		}
	} catch (error) {
    console.error("Error retrieving active products:", error);
    return res.status(500).send("Error retrieving active products: " + error.message);
	}
}



module.exports.updateProdInfo = async (req, res) => {
	const {name, img, price, quantity, isActive} = req.body;
	const productId = req.params.productId;

	try{
		const productInfo = await Product.findById({_id:productId});
		
		    if (!productInfo) {
      			return res.status(404).json({ message: 'Product not found' });
    		}

		productInfo.name = name || productInfo.name;
		productInfo.img = img || productInfo.img;
		productInfo.price = price || productInfo.price;
		productInfo.quantity = quantity || productInfo.quantity;
		productInfo.isActive = isActive || productInfo.isActive;

		console.log("Product Info Updated")
		productInfo.save();
		return res.send(true);

	} catch (err) {
    console.error(err);
    res.status(500).send(false);
  }
}

module.exports.archivedProd = async (req,res) => {
	const productId = req.params.productId;

	try{
		const productInfo = await Product.findById({_id:productId})

		    if (!productInfo) {
      			return res.status(404).json({ message: 'Product not found' });
    		}

  		productInfo.isActive = false;

  		console.log("Product Inactive: " + productInfo.name);
			productInfo.save();
			return res.send(productInfo);  		
	} catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
}


module.exports.activateProd = async (req,res) => {
	const productId = req.params.productId;

	try{
		const productInfo = await Product.findById({_id:productId})

		    if (!productInfo) {
      			return res.status(404).json({ message: 'Product not found' });
    		}

  		productInfo.isActive = true;

  		console.log("Product Activate: " + productInfo.name);
			productInfo.save();
			return res.send(productInfo);  		
	} catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
}








