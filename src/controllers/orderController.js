const { isValidObjectId } = require("mongoose")
const OrderModel = require("../models/orderModel")
const userModel = require("../models/userModel")

const createOrder= async function (req, res) {
    const data = req.body
    const savedData3 = await OrderModel.create(data)
    const isFreeAppUser = req.isFreeAppUser
    res.send({msg: savedData3})
}

const orderDocument = async function (req, res) {
    
    let { userId, productId } = req.body

    const userDetails = await userModel.findById(userId)
    if(!userDetails){
        return res.send ({ msg: "user is not present" })
    }

    const productDetails = await userModel.findById(productId)
    if(!productDetails){
        return res.send ({ msg: "product is not present" })
    }

    const isFreeAppUser = req.isFreeAppUser
    if(isFreeAppUser){
        const order = await OrderModel.create({
            userId : userId,
            productId: productId,
            amount: 0,
            isFreeAppUser: isFreeAppUser,
            date: new Date()
        })
        
        return res.send ({ data: order})
    
    } else {
        
        if(userDetails.balance < productDetails.price){
            return res.send ({ msg: "you don't have sufficient balance" })
        }
        
        const order1 = { userId : userId,
            productId: productId,
            amount: productDetails.price,
            isFreeAppUser: isFreeAppUser,
            date: new Date()
        }

        const order2 = await orderModel.create(order1)
        const user = await userModel.findByIdAndUpdate(userId, { $set: { balance:userDetails.balance - productDetails.price }})
         return res.send ({ data: order2 })
        }
}
    
module.exports = { createOrder, orderDocument }