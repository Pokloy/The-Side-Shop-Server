const User = require("../models/Users");
const Order = require("../models/Order");
const Product = require("../models/Products");
const Reciept = require("../models/Reciept");
const bcrypt = require("bcrypt");
const auth = require("../auth");


//[SECTION] Retrieve user details

	module.exports.getProfile = (req, res) => {

		return User.findById(req.user.id)
		.then(result => {
			result.password = "";
			return res.send(result);
		})
		.catch(err => res.send(err))
	};


module.exports.userRegistration = (req, res) => {
	console.log(req.body);
	let newUser = new User({
		email: req.body.email,
		password: bcrypt.hashSync(req.body.password, 10),
		isAdmin: req.body.isAdmin
	})

	return newUser.save().then((user,error) => {
		if(error){
			console.log("No User Added");
			return res.send(false);
		} else {
			console.log("New User Added");
			return res.send(user);
		}
	})

}

module.exports.testingUser = (req,res) => {
	console.log('Test Success');
	return res.send("User Connection Success");
}




module.exports.userLogin = async (req,res) => {
	try {		
		return User.findOne({email: req.body.email}).then(result => {
			if(result == null){
				return false;
			} else {
				const isPasswordCorrect = bcrypt.compareSync(req.body.password, result.password);
				if(isPasswordCorrect){
					return res.send({access:auth.createAccessToken(result)})
				} else {

					return res.send("Login Failed");
				}
			}
		})

	} catch (error) {
    	return res.status(500).json({ message: 'An error occurred while updating the user role' });
  	}
}


// Need Clarification on this part [Verified by sir Andrie]
module.exports.currentUserDetails = async (req, res) => {
	const currentUserId = req.user.id;
	const paramsId = req.params.userId;

		let currentUser = await User.findById({_id: currentUserId});
		const userId = currentUser._id.toString();

		if(currentUser._id == paramsId)
		{
			console.log("Matched");
			if(currentUserId){
				try {
				currentUser.password = '';
				return res.send(currentUser);
				} catch (error) {
		    	return res.status(500).json({ message: 'An error occurred while updating the user role' });
  		}
			} else {
		 			return res.send(false);
			}
		} else {
			res.send(false);
		}
}


module.exports.setUserAdmin = async (req, res) => {
	const userId = req.params.userId;


	try {
			const userToBeAdmin = await User.findById({_id:userId})
		if(!userToBeAdmin){
			return res.status(404).json({ message: 'User not found' });
		} 

		if(userToBeAdmin.isAdmin === false){
			userToBeAdmin.isAdmin = true;
			await userToBeAdmin.save();
			return res.send('User Set To Admin');
		} else {
			userToBeAdmin.isAdmin = false;
			await userToBeAdmin.save();
			return res.send('User Set To Non-Admin');
		}

	} catch (error) {
    console.error("Error retrieving active user:", error);
    return res.status(500).send(false);
  }
}


module.exports.viewAllUser = async (req, res) => {
	try {
		const allUser = await User.find()
		return res.send(allUser);
	}
	catch (error) {
    console.error("Error retrieving active user:", error);
    return res.status(500).send("Error retrieving user: " + error.message);
	}

}





module.exports.usersOrder = async (req, res) => {
  const currentUserId = req.user.id;

  	if(currentUserId){
  		  try {
			    const currentUsersOrders = await Order.find({ userId: currentUserId });

			    if (!currentUsersOrders || currentUsersOrders.length === 0) {
			      return res.status(404).json({ message: 'No orders found for the current user' });
			    }

			    return res.send(currentUsersOrders.map(order => order.products));
			  } catch (error) {
			    console.error("Error retrieving user's orders:", error);
			    return res.status(500).send("Error retrieving user's orders: " + error.message);
			  }
	} else {
		return res.send(false);
	}
};


module.exports.retrieveAllOrders = async (req, res) => {
	const currentUserId = req.user.id;
	if(currentUserId){
			const allOrder = await Order.find();
			return res.send(allOrder);
	} else {
			return res.send(false);
	}
}



module.exports.createOrder = async (req,res) => {

	const currentUserId = req.user.id;
	const productsBody = req.body.products;
	let totalprice = 0;
	let currentProd;
	let productById;
	let prodquantity;
	let totalPricePerProd;
	

	if(currentUserId){
				try {
					for(let i = 0; productsBody.length > i; i++ )
					{
					currentProd = productsBody[i].productId;
					productById =  await Product.findById({_id:currentProd});
					prodquantity = productsBody[i].quantity;
					totalPricePerProd = productById.price * prodquantity;
					totalprice += totalPricePerProd;
					}
					let newOrder = new Order({
						userId: currentUserId,
						products: productsBody,
						totalAmount: totalprice
					})

				newOrder.save();
				console.log("New Order Data Saved");
				return res.send(newOrder);

				} catch (error) {
			    console.error("Error retrieving products:", error);
			    return res.status(500).send("Error retrieving products: " + error.message);
			  }
	} else {
		return res.send(false);
	}
}
