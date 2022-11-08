const orderModel = require("../models/orderModel")
const userModel = require("../models/userModel")
const productModel = require("../models/productModel")

const createOrder = async function (req, res) {
    const data = req.body
    const isFreeAppUser = req.isFreeAppUser
    if (isFreeAppUser) {

        const savedData3 = await orderModel.create(data)

        res.send({ msg: savedData3 })
    } else {

        let balances = await userModel.findOne({ _id: data.userId }).select({ balance: 1, _id: 0 })
        let prices = await productModel.findOne({ _id: data.productId }).select({ price: 1, _id: 0 })

        if (balances.balance > prices.price) {
            const savedData4 = await userModel.findOneAndUpdate({ _id: data.userId }, { $set: { balance: balances.balance - prices.price } }, { new: true })
            const savedData5 = await orderModel.create(data)
            const savedData6 = await orderModel.findOneAndUpdate({ data }, { $set: { amount: prices.price, isFreeAppUser: false } }, { new: true })

            return res.send({ msg: savedData6 })
        } else {
            return res.send({ msg: "insufficient balance" })
        }
    }
}


module.exports = { createOrder }