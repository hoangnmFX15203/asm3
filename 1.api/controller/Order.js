const Order = require('../models/Order');
const User = require('../models/User');

exports.createOrder = async (req, res) => {
    const { _id } = req.user;
    const userCart = await User.findById(_id)
        .select('cart')
        .populate('cart.product', 'title price');
    console.log(userCart.cart);
    const products = userCart?.cart?.map((el) => ({
        product: el.product._id,
        count: el.quantity,
        color: el.color,
    }));
    let total = userCart?.cart?.reduce(
        (sum, el) => el.product.price * el.quantity + sum,
        0,
    );
    const rs = await Order.create({ products, total, orderBy: _id });
    return res.json({
        success: rs ? true : false,
        rs: rs ? rs : 'Something went wrong',
    });
};

exports.updateStatus = async (req, res) => {
    const { oid } = req.params;
    const { status } = req.body;
    if (!status) return res.status(400).json('Missing status');
    const response = await Order.findByIdAndUpdate(
        oid,
        { status },
        { new: true },
    );
    return res.json({
        success: response ? true : false,
        rs: response ? response : 'Something went wrong',
    });
};

exports.getUserOrder = async (req, res) => {
    const { _id } = req.user;
    const response = await Order.find({ orderBy: _id });
    return res.json({
        success: response ? true : false,
        rs: response ? response : 'Something went wrong',
    });
};

exports.getOrders = async (req, res) => {
    const response = await Order.find();
    return res.json({
        success: response ? true : false,
        rs: response ? response : 'Something went wrong',
    });
};
