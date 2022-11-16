const mongoose = require("mongoose")

const authorSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true
        },
        lastName: {
            type: String,
            required: true,
            trim: true
        },
        title: {
            type: String,
            required: true,
            enum: ["Mr", "Mrs", "Miss"],
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            trim: true
        }
    },
    { timestamps: true });


module.exports = mongoose.model('Author', authorSchema)
