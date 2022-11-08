const mongoose = require('mongoose')
const objectId = mongoose.Schema.Types.ObjectId

const date = new Date()
const currentDate = date.getDate() + "-" +
 (date.getMonth()+1) + "-" +
 date.getFullYear() + "-" +
 date.getHours() + ":" +
 date.getMinutes() + ":" + 
 date.getSeconds()  

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
    date: {
        type: String,
        default: currentDate
    }    

    
}, { timestamps: true });

module.exports = mongoose.model('Order1', orderSchema)