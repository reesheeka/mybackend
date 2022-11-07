const jwt = require("jsonwebtoken");

const userModel = require("../models/userModel")

const createUser = async function (req, res) {

  let data = req.body;
  let savedData = await userModel.create(data);
  res.send({ msg: savedData });

}

//Question2
const loginUser = async function (req, res) {

  let userName = req.body.emailId;
  let password = req.body.password;

  let user = await userModel.findOne({ emailId: userName, password: password });
  if (!user) {
    return res.send({ status: false, msg: "username or the password is not corerct" });
  }
  let token = jwt.sign({ userId: user._id.toString() }, "assignment-secret-key")
  res.setHeader("x-auth-token", token);
  res.send({ status: true, token: token });
}

//Question3
const getUserData = function (req, res) {
  const user = req.userDetails
  res.send({ status: true, data: user });
 

}

//Question4
const postMessage = async function (req, res) {
  let message = req.body.message

  let user = await userModel.findById(req.params.userId)
  if (!user) return res.send({ status: false, msg: 'No such user exists' })

  let updatedPosts = user.posts
  updatedPosts.push(message)

  let updatedUser = await userModel.findOneAndUpdate({ _id: user._id }, { posts: updatedPosts }, { new: true })
  return res.send({ status: true, data: updatedUser })
}

//Question5
const updateUser = async function (req, res) {

  let userId = req.params.userId
  let user = await userModel.findById(userId)
  if (!user) {
    return res.send("No such user exists")
  }

  let userData = req.body
  let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData, { new: true })
  res.send({ status: true, data: updatedUser })
}

//Question6
const deleteUser = async function (req, res) {

  let userId = req.params.userId
  let user = await userModel.findById(userId)

  if (!user) {
    return res.send("No such user exists")
  }

  let deleteUser = await userModel.findOneAndUpdate({ _id: userId }, { $set: { isDeleted: true } }, { new: true })
  res.send({ status: true, data: deleteUser })
}



module.exports = { createUser, loginUser, getUserData, updateUser, deleteUser, postMessage }


