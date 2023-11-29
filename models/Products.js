const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
	name: {
		type:String,
		required: [true, 'Product Name is Required']	
	},
	img: {
		type:String,
		required: [true, 'Image Name is Required']	
	},
	price: {
		type: Number,
		required: [true, 'Description is Required']
	},
	quantity: {
		type: Number,
		required: [true, 'Number of Products is Required']
	},
	isActive: {
		type: Boolean,
		required: [true, 'Account type is required']
	}, 
	createdOn: {
		type: Date,
		default: new Date() 
	}
})

module.exports = mongoose.model('Product', productSchema);