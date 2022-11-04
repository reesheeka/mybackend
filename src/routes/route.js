const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController")
const commonMiddleware = require("../commonMW/userMiddleWare")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createUser", userController.createUser )

router.post("/loginUser", userController.loginUser)

router.get("/users/:userId", commonMiddleware.userMiddleWare, userController.getUserData)

router.put("/users/:userId", commonMiddleware.userMiddleWare, userController.updateUser)

router.delete("/users/:userId", commonMiddleware.userMiddleWare, userController.deleteUser)

module.exports = router;