const jwt = require("jsonwebtoken")
const userModel = require("../models/userModel")

const authenticate = function (req, res, next) {
    let token = req.headers["x-auth-token"]

    if (!token) {
        return res.send({ status: false, msg: "token must be present" })
    }

    let decodedToken = jwt.verify(token, "assignment-secret-key")

    if (!decodedToken) {
        return res.send({ status: false, msg: "token is invalid" })
    }
    req.decodedToken = decodedToken

    next()
}

const authorise = function (req, res, next) {
  
    const decodedToken = req.decodedToken

    let existingUser = req.params.userId
    let userLoggedIn = decodedToken.userId
    
    if (existingUser != userLoggedIn) {
    return res.send ({ status: false, msg: "User logged and existing user is not same" })
    }

    next()
}

const mid1 = async function(req,res,next){

    let userId = req.params.userId
    let userDetails =  await userModel.findById(userId)
    
    if (!userDetails){
      return res.send({ status: false, msg: "No such user exists" })
    }

    req.userDetails = userDetails
   
    next()
    
}

module.exports = { authenticate, authorise, mid1 }