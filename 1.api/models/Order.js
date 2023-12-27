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
                product: { type: mongoose.Types.ObjectId, ref: 'Product' },
                quantity: Number,
                color: String,
                price: Number,
                title: String,
                thumbnail: String,
            },
        ],
        total: { type: Number },
        status: {
            type: String,
            default: 'Processing',
            enum: ['Cancelled', 'Processing', 'Succeed'],
        },
    },
    { timestamps: true },
);

//Export the model
module.exports = mongoose.model('Order', orderSchema);
