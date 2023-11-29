const Banner = require("../models/Banner");
const auth = require("../auth");






module.exports.bannersRetrieved = async (req,res) => {
	try{
		const banners = await Banner.find({});
		return res.send(banners);
	} catch (error) {
		console.error("Error banners:", error);
    return res.status(500).send("Error retrieving banner: " + error.message);
	}
}

module.exports.addBanner = async (req,res) => {
	let newBanner = new Banner({
		name: req.body.name,
		img: req.body.img
	})

	return await newBanner.save()
	.then((banner, error) => {
		if(error){
			console.log("No Banner Found");
			return res.send(false);
		} else {
			console.log("Banner Found");
			return res.send(true);
		}
	})
	.catch((err) => {
		return res.status(500).send("Error adding banner: " + error.message);
	})
}



module.exports.updateBanner = async (req, res) => {
	const {name, img } = req.body; 
	const bannerId = req.params.bannerId;

	try{
		const bannerInfo = await Banner.findById({_id:bannerId});

		if(!bannerInfo){
			return res.status(404).json({ message: 'Banner not found' });
		}

		bannerInfo.name = name || bannerInfo.name;
		bannerInfo.img = img || bannerInfo.img;

		console.log("Banner Info Updated")
		bannerInfo.save();
		return res.send(true);
	} catch (err) {
	    console.error(err);
    	res.status(500).send(false);
	}
}

module.exports.deleteBanner = async (req, res) => {
	const bannerId = req.params.bannerId;

	try {
		await Banner.findByIdAndDelete(bannerId);
		return res.send(true);

	} catch (error) {
	    console.error(error);
    	res.status(500).json({ message: 'Internal Server Error' });
	}
}
