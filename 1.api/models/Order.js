const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema(
    {
        orderBy: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        },
        products: [
            {
                products: {
                    type: mongoose.Types.ObjectId,
                    ref: 'Product',
                },
                count: Number,
                color: String,
            },
        ],
        total: { type: Number },
        status: {
            type: String,
            default: 'Processing',
            enum: ['Cancelled', 'Processing', 'Succeed'],
        },

        paymentIntent: {},
    },
    { timestamps: true },
);

//Export the model
module.exports = mongoose.model('Order', orderSchema);
