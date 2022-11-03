const UserModel= require("../models/userModel")




const basicCode= async function(req, res, next) {
    console.log( "HEADER DATA ABOVE")
    console.log( "hey man, congrats you have reached the Handler")
    //res.send({ msg: "This is coming from controller (handler)"})
    next()
    }

const createUser= async function (req, res) {
    let data = req.body
    let savedData1 = await UserModel.create(data)
    res.send({msg: savedData1})
}

const getUsersData= async function (req, res) {
    let allUsers= await UserModel.find()
    res.send({msg: allUsers})
}


module.exports.createUser= createUser
module.exports.getUsersData= getUsersData
