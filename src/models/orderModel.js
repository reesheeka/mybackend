const { ObjectId } = require('mongoose');
const mongoose = require('mongoose');
const productModel = require('./productModel');
const userModel = require('./userModel');
const objectId = mongoose.Schema.Types.ObjectId

const orderSchema = new mongoose.Schema( {
    userId: {
        type: objectId,
        ref: "User1",
        required: true
    },
    productId: {
        type: objectId,
        ref: "Product1",
        required: true
    },
    amount: {
        type: Number,
        default: 0
    },
    isFreeAppUser: {
        type: Boolean,
        default: true
    },
    date: Date

    
}, { timestamps: true });

module.exports = mongoose.model('Order1', orderSchema)