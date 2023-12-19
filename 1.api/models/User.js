const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require('bcrypt'); // Erase if already required

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
        },
        lastname: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        mobile: {
            type: String,
            required: true,
            // unique: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: String,
            enum: [1,2,3],
            default: 2,
        },
        cart: [
            {
                product: { type: mongoose.Types.ObjectId, ref: 'Product' },
                quantity: Number,
                color: String,
                price: Number,
            },
        ],
        address: String,
        refreshToken: {
            type: String,
        },
    },
    { timestamps: true },
);

userSchema.pre('save', async function () {
    const salt = 10;
    this.password = await bcrypt.hash(this.password, salt);
});
userSchema.methods = {
    isCorrectPassword: async function (password) {
        return await bcrypt.compare(password, this.password);
    },
};
//Export the model
module.exports = mongoose.model('User', userSchema);
