const mongoose = require('mongoose');

const userSchema = new mongoose.Schema( {

    bookName : String, 
    authorName: String,
    category : {
        type: String,
        required: true,
    },
    year: Number,

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema) //users



// String, Number
// Boolean, Object/json, array