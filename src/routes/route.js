const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const commonMW = require("../middleware/auth")

//router.all("*/", function(req, res){ res.send("Please enter valid url")})

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/users", userController.createUser)

router.post("/login", userController.loginUser)

router.post("/users/:userId/posts", commonMW.authenticate, commonMW.authorise, userController.postMessage)

router.get("/users/:userId", commonMW.authenticate, commonMW.authorise, commonMW.mid1, userController.getUserData)

router.put("/users/:userId", commonMW.authenticate, commonMW.authorise, commonMW.mid1, userController.updateUser)

router.delete('/users/:userId', commonMW.authenticate, commonMW.authorise, commonMW.mid1, userController.deleteUser)



module.exports = router;