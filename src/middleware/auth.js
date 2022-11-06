const jwt = require("jsonwebtoken")

const authenticate = function (req, res, next) {
    let token = req.headers["x-auth-token"]

    if (!token) {
        return res.send({ status: false, msg: "token must be present" })
    }

    let decodedToken = jwt.verify(token, "assignment-secret-key")

    if (!decodedToken) {
        return res.send({ status: false, msg: "token is invalid" })
    }

    next()
}


const authorise = function (req, res, next) {
    // comapre the logged in user's id and the id in request
    let token = req.headers["x-auth-token"]

    if (!token) {
        return res.send({ status: false, msg: "token must be present" })
    }

    let decodedToken = jwt.verify(token, "assignment-secret-key")

    if (!decodedToken) {
        return res.send({ status: false, msg: "token is invalid" })
    }

    let existingUser = req.params.userId
    
    let userLoggedIn = decodedToken.userId

    //userId comparision to check if the logged-in user is requesting for their own data
    if (existingUser != userLoggedIn) {
    return res.send ({ status: false, msg: "User logged and existing user is not same" })
    }

    next()
}

module.exports = { authenticate, authorise }