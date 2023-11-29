const mongoose = require('mongoose');
const { Types: { ObjectId } } = mongoose;


const receiptSchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
    required: [true, 'User Id is required'],
  },
  products: [
    {
      productId: {
        type: ObjectId,
        required: [true, 'Product Id is required'],
      },
      productName: {
        type: String,
        required: [true, 'Product Name is required'],
      },
      quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
      },
      subTotal: {
        type: Number,
        required: [true, 'Subtotal is required'],
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: [true, 'Total Amount is required'],
  },
  totalTax: {
    type: Number,
    required: [true, 'Total Tax is required'],
  },
  purchasedOn: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model('Receipt', receiptSchema);