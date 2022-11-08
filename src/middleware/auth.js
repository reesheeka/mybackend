const jwt = require("jsonwebtoken")
const userModel = require("../models/userModel")

const authenticate = function (req, res, next) {

    try {

        let token = req.headers["x-auth-token"]

        if (!token) {
            return res.status(401).send({ status: false, msg: "token must be present" })
        }

        let decodedToken = jwt.verify(token, "assignment-secret-key")
        req.decodedToken = decodedToken

        if (decodedToken) {
            next()
        } else {
            return res.status(401).send({ status: false, msg: "token is invalid" })
        }

    }
    catch (error) {
        return res.status(500).send({ msg: error.message })
    }
}

const authorise = function (req, res, next) {

    try {

        const decodedToken = req.decodedToken
        let existingUser = req.params.userId
        let userLoggedIn = decodedToken.userId

        if (existingUser == userLoggedIn) {
            next()
        } else {
            return res.status(401).send({ status: false, msg: "User logged and existing user is not same" })
        }
    }
    catch (error) {
        return res.status(500).send({ msg: error.message })
    }

}

const mid1 = async function (req, res, next) {

    try {

        let userId = req.params.userId
        let userDetails = await userModel.findById(userId)
        req.userDetails = userDetails

        if (userDetails) {
            next()
        } else {
            return res.status(401).send({ status: false, msg: "No such user exists" })
        }
    }
    catch (error) {
        return res.status(500).send({ msg: error.message })
    }
}

module.exports = { authenticate, authorise, mid1 }