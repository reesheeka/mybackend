const express = require('express');
const router = express.Router();

const UserController = require("../controllers/userController")


router.post("/create", UserController.middleware )

router.get("/get", UserController.middleware1)




module.exports = router;