const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        slug: {
            type: String,
            require: true,
            // unique: true,
            lowercase: true,
        },
        desc: {
            type: Array,
            required: true,
        },
        img: {
            type: Array,
        },
        thumb: {
            type: String,
        },
        brand: {
            type: String,
        },
        categories: {
            type: String,
        },
        quantity: {
            type: Number,
            default: 0,
        },
        sold: {
            type: Number,
            default: 0,
        },
        size: {
            type: String,
        },
        color: {
            type: String,
        },
        price: {
            type: Number,
            required: true,
        },
        ratings: [
            {
                star: { type: Number },
                postedBy: { type: mongoose.Types.ObjectId, ref: 'User' },
                comment: { type: String },
            },
        ],
        totalRatings: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true },
);

//Export the model
module.exports = mongoose.model('Product', productSchema);
