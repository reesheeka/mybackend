const express = require('express');
const router = express.Router();
const UserController= require("../controllers/userController")
const ProductController= require("../controllers/productController")
const OrderController= require("../controllers/orderController")

const commonMW = require ("../middlewares/commonMiddlewares")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


router.post("/createUser", commonMW.myMiddleware, UserController.createUser)
router.post("/createProduct", ProductController.createProduct)
router.post("/createOrder", commonMW.myMiddleware, OrderController.createOrder)


module.exports = router;