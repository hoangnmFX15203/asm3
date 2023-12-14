const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var cartSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        product: [
            {
                product: {
                    type: String,
                },
                quantities: {
                    type: Number,
                    default: 1,
                },
            },
        ],
        img: {
            type: String,
        },
        categories: {
            type: Array,
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
    },
    { timestamps: true },
);

//Export the model
module.exports = mongoose.model('Cart', cartSchema);
