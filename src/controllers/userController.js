const UserModel= require("../models/userModel")

const createUser= async function (req, res) {
    const data = req.body
    const savedData1 = await UserModel.create(data)
    const isFreeAppUser = req.isFreeAppUser
    res.send({msg: savedData1})
}

const getUsersData= async function (req, res) {
    let allUsers= await UserModel.find()
    res.send({msg: allUsers})
}


module.exports.createUser= createUser
module.exports.getUsersData= getUsersData
