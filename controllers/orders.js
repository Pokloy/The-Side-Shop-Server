const Order = require("../models/Order");
const Product = require("../models/Products");
const Reciept = require("../models/Reciept");
const User = require("../models/Users");
const bcrypt = require("bcrypt");
const auth = require("../auth");





module.exports.addedProducts = async(req, res) => {
  const currentUserId = req.user.id;
  const productsBody = req.body;

  const userOrderInfo  = await Order.findOne({userId:currentUserId});
  try {
    // Verify Customer Orders Existance
    if(userOrderInfo){
        // existing orders
        for(let i = 0;productsBody.length > i; i++){
          userOrderInfo.products.push(productsBody[i])
        }
        userOrderInfo.save();
        return res.send(userOrderInfo.products);
    } else {
          // const newOrder = await createOrder(currentUserId, productsBody);
          // return res.send(newOrder);
        // non existing orders
      return res.send("Please Create an Order. Route:  http://localhost:4000/order/add-cart/check-out");
    } 
  } catch (error) {
    console.error("Error retrieving products:", error);
    return res.status(500).send("Error retrieving products: " + error.message);
  }
}


module.exports.testingOrder = async (req,res) => {
  return res.send("Order Connection Success");
}




module.exports.changeQuantity = async (req, res) => {
    const currentUserId = req.user.id;
    let productIdIndex = req.body.productIdIndex;
    let productquantity = req.body.quantity;
    let productBody = req.body;
    const userOrderInfo  = await Order.findOne({userId:currentUserId});

  try {
    if(userOrderInfo){
      userOrderInfo.products[productIdIndex].quantity = productquantity;
      userOrderInfo.save();
      return res.send(userOrderInfo);

    } else {
      return res.send("Please Create an Order. Route:  http://localhost:4000/order/add-cart/check-out");
    }
  } catch (error) {
    console.error("Error retrieving products:", error);
    return res.status(500).send("Error retrieving products: " + error.message);
  }
}

module.exports.removedProduct = async (req, res) => {
  const currentUserId = req.user.id;
  let productIdIndex = req.body.productIdIndex;

  try {
    const userOrderInfo = await Order.findOne({ userId: currentUserId });

    if (!userOrderInfo) {
      console.log("No order found for the current user");
    } else {
      if (productIdIndex >= 0 && productIdIndex < userOrderInfo.products.length) {
        userOrderInfo.products.splice(productIdIndex, 1);

        await userOrderInfo.save();

        console.log("Item removed from the order");
        return res.send(userOrderInfo.products);
      } else {
        console.log("Invalid productIdIndex");

      }
    }
  } catch (error) {
    console.error("Error retrieving user's order:", error);
    return res.status(500).send("Error retrieving user's order: " + error.message);
  }
};

module.exports.subTotalPrice = async (req, res) => {
  const currentUser = req.user.id;

  try {
    const orderDetails = await Order.find({userId:currentUser}, 'products');
    const result = [];

    for (const order of orderDetails) {
      if (order.products && order.products.length > 0) {
        const orderSubtotal = order.products.map(async (product) => {
          const { productId, quantity } = product;
          const productDetails = await Product.findById(productId);

          if (productDetails) {
            const { name, price } = productDetails;
            const subtotal = price * quantity;
            return { name, quantity, subtotal };
          } else {
            console.log(`Product not found with ID: ${productId}`);
            return { productName: 'Product Not Found', subtotal: 0 };
          }
        });

        result.push(...await Promise.all(orderSubtotal));
      }
    }

    const total = result.reduce((acc, product) => acc + product.subtotal, 0);

    return res.json({ subtotals: result, total });
  } catch (error) {
    console.error("Error calculating subtotals and total:", error);
    return res.status(500).json({ message: "Error calculating subtotals and total" });
  }
};



module.exports.getAllOrder = async (req, res) => {
  try {
    const allOrders = await Order.find(); 
    return res.send(allOrders);
  } catch (error) {
    console.error('Error retrieving orders:', error);
  }
}



module.exports.produceReciept = async (req, res) => {
  const orderId = req.params.orderId;

  try {
  //   // Find the order by ID
    const order = await Order.findById({_id:orderId});
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Fetch base prices for products
    const productIds = order.products.map(product => product.productId);    


    const products = await Product.find({ _id: { $in: productIds } });


    // Transfer data from Order to Receipt
    const receiptData = new Reciept(
    {
      userId: order.userId,
      products: order.products.map((productOrder) => {


        const matchingProduct = products.find(product => product._id.equals(productOrder.productId));
        return {
          productId: productOrder.productId,
          productName: matchingProduct.name,
          quantity: productOrder.quantity,
          subTotal: matchingProduct.price * productOrder.quantity,
        };
      }),
      totalAmount: order.totalAmount + order.products.reduce((acc, productOrder) => {
          const matchingProduct = products.find(product => product._id.equals(productOrder.productId));
          return acc + matchingProduct.price * productOrder.quantity;
        }, 0),

      totalTax: 5 * order.products.length, // You can calculate tax here if needed
    }
    );

    // Create a new Receipt
    const receipt = receiptData;
    console.log(receipt);

    // Save the new Receipt
    await receipt.save();

    // Delete the order
    await Order.findByIdAndDelete(orderId);

    res.json({ message: 'Transfer successful', receipt });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

