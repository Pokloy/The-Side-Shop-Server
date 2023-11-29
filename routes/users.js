const express = require('express');
const userController = require('../controllers/users');
const auth = require("../auth");

const {verify, verifyAdmin } = auth;

const router = express.Router();


// Regular User side
router.post("/", userController.userRegistration);
router.post("/login", userController.userLogin);
router.get("/:userId/userDetails", verify, userController.currentUserDetails);
router.get("/myOrders", verify, verifyAdmin, userController.usersOrder);
router.post("/checkout", verify, userController.createOrder);


//[ACTIVITY] Route for retrieving user details
router.get("/details", verify, userController.getProfile);


// Admin User side
router.get("/all", verify, verifyAdmin, userController.viewAllUser);
router.put("/:userId/setAsAdmin", verify, verifyAdmin, userController.setUserAdmin);
router.get("/orders", verify, verifyAdmin, userController.retrieveAllOrders);



//Testing COnnectione
router.get("/testingUser", userController.testingUser)






module.exports = router;