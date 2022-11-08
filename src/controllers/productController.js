const ProductModel = require("../models/productModel")

const createProduct= async function (req, res) {
   
    let data= req.body
    let savedData2 = await ProductModel.create(data)
    res.send({msg: savedData2})
}


module.exports.createProduct = createProduct