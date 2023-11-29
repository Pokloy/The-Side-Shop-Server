const mongoose = require('mongoose');
const { Types: { ObjectId } } = mongoose;


const bannerSchema = new mongoose.Schema({
  name: {
    type:String,
    required: [true, 'Product Name is Required']  
  },
  img: {
    type:String,
    required: [true, 'Image Link is Required']  
  },
  isAdmin: {
    type: Boolean,
    required: [false, 'User type is Required']
  },
  createdOn: {
    type: Date,
    default: new Date() 
  }
});


module.exports = mongoose.model('Banner', bannerSchema);
