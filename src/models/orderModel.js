const { ObjectId } = require('mongoose');
const mongoose = require('mongoose');
const productModel = require('./productModel');
const userModel = require('./userModel');
const objectId = mongoose.Schema.Types.ObjectId

const orderSchema = new mongoose.Schema( {
    userId: {
        type: objectId,
        ref: "User1"
    },
    productId: {
        type: objectId,
        ref: "Product1"
    },
    amount: {
        type: Number,
        default: 0
    },
    date: {
        type: String,
        default: 22/11/2021
    }
    
}, { timestamps: true });

module.exports = mongoose.model('Order1', orderSchema)