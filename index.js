const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/order');
const bannerRoutes = require('./routes/banner');

const port = 4006;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


mongoose.connect('mongodb+srv://admin:adminadmin@zuitt-bootcamp.rhm4dok.mongodb.net/Capstone2API?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas.'));

// [Section] routes

app.use("/b6/users", userRoutes);
app.use("/b6/products", productRoutes);
app.use("/b6/orders", orderRoutes);
app.use("/b6/banners", bannerRoutes);



if(require.main === module){
	app.listen(process.env.PORT || port, () => {
		console.log(`API is now online on port ${ process.env.PORT || port}`)
	})
}

module.exports = {app, mongoose};