const jwt = require("jsonwebtoken")

const authenticate = function(req, req, next) {
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


const authorise = function(req, res, next) {
    // comapre the logged in user's id and the id in request
    next()
}

module.exports = { authenticate }