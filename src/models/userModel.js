const mongoose = require('mongoose');

const userSchema = new mongoose.Schema( {
    firstName: String,
    lastName: String,
    mobile: String,
    emailId: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"]
    },
    isDeleted:{
        type: Boolean,
        default: false
    },
    age: Number,

}, { timestamps: true });

module.exports = mongoose.model('User2', userSchema)
