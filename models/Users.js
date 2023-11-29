const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
	email:{
		type: String,
		required: [true, 'Email is Required']	
	},
	password: {
		type: String,
		required: [true, 'Password is Required']	
	},
	isAdmin: {
		type: Boolean,
		required: [false, 'User type is Required']
	}
})


module.exports = mongoose.model('Users', userSchema);