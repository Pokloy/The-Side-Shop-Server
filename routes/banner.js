const express = require('express');
const bannerController = require('../controllers/banner')
const auth = require("../auth");

const {verify, verifyAdmin } = auth;

const router = express.Router();


router.post("/addBanner", verify, verifyAdmin, bannerController.addBanner);
router.get("/", bannerController.bannersRetrieved);
router.put("/:bannerId", verify, verifyAdmin, bannerController.updateBanner);
router.delete("/:bannerId/deleteBanner", verify, verifyAdmin, bannerController.deleteBanner);


module.exports = router;