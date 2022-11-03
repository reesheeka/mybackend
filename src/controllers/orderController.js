const OrderModel = require("../models/orderModel")

const createOrder = async function (req, res) {
    let data = req.body

    let savedData3 = await OrderModel.create(data)
    res.send({msg: savedData3})
}


module.exports.createOrder = createOrder