const Order = require('../models/Order');
const User = require('../models/User');

exports.createOrder = async (req, res) => {
    const { _id } = req.user;
    const {products,total, address} = req.body;
    console.log(req.body)
    if (address) {
        await User.findByIdAndUpdate(_id, {address, cart: []})
    }
    
    const rs = await Order.create({ products, total, orderBy: _id, status: 'Processing' });
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
