const jwt = require("jsonwebtoken");

const userModel = require("../models/userModel")

const createUser = async function (req, res) {
  
  try {

    let data = req.body
    let savedData = await userModel.create(data)
    res.status(201).send({ msg: savedData })
  }
  catch (error) {
    return res.status(500).send({ msg: error.message })
  }

}

//Question2
const loginUser = async function (req, res) {
  
  try {

    let userName = req.body.emailId
    let password = req.body.password

    let user = await userModel.findOne({ emailId: userName, password: password })
    if (user) {
      let token = jwt.sign({ userId: user._id.toString() }, "assignment-secret-key")
      res.status(200).send({ status: true, token: token })
    } else {
      return res.status(404).send({ status: false, msg: "username or the password is not corerct" })
    }
  }
  catch (error) {
    return res.status(500).send({ msg: error.message })
  }
}

//Question3
const getUserData = function (req, res) {
  
  try {

    const user = req.userDetails
    return res.status(200).send({ status: true, data: user })
  }
  catch (error) {
    return res.status(500).send({ msg: error.message })
  }
}

//Question4
const postMessage = async function (req, res) {

  try {

    let message = req.body.message
    let user = req.userDetails
    let updatedPosts = user.posts
    updatedPosts.push(message)

    let updatedUser = await userModel.findOneAndUpdate({ _id: user._id }, { posts: updatedPosts }, { new: true })
    return res.status(200).send({ status: true, data: updatedUser })
  }
  catch (error) {
    return res.status(500).send({ msg: error.message })
  }
}

//Question5
const updateUser = async function (req, res) {

  try {

    let user = req.userDetails
    let userData = req.body
    let updatedUser = await userModel.findOneAndUpdate({ _id: user }, userData, { new: true })
    return res.status(200).send({ status: true, data: updatedUser })
  }
  catch (error) {
    return res.status(500).send({ msg: error.message })
  }
}

//Question6
const deleteUser = async function (req, res) {

  try {
    let user = req.userDetails
    let deleteUser = await userModel.findOneAndUpdate({ _id: user }, { $set: { isDeleted: true } }, { new: true })
    return res.status(200).send({ status: true, data: deleteUser , msg : "deleted sucessfully"})
  }
  catch (error) {
    return res.status(500).send({ msg: error.message })
  }
}



module.exports = { createUser, loginUser, getUserData, updateUser, deleteUser, postMessage }


