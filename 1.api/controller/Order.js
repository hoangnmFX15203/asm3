const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');
const sendMail = require('../utils/sendMail');

exports.createOrder = async (req, res) => {
    const { _id } = req.user;
    const { products, total, address } = req.body;
    for (const productData of products) {
        const {product, quantity} = productData;
        const existingProduct  = await Product.findById(product)
        if (existingProduct) {
            const updatedQuantity = existingProduct.quantity - quantity;
            await Product.findOneAndUpdate(
                { _id: product },
                { $set: { quantity: updatedQuantity } },
                { new: true }
              );
        }
    }
    if (address) {
        await User.findByIdAndUpdate(_id, { address, cart: [] });
    }
    const user = await User.findById(_id);
    const rs = await Order.create({
        products,
        total,
        orderBy: _id,
        status: 'Processing',
    });
    const data = {
        email: user.email,
        name: `${user.firstname} ${user.lastname}`,
        subject: 'Confirm Order',
        products: products,
        link: `http://localhost:5000/api/order/${rs._id}`,
        total: total,
    };
    sendMail(data);

    return res.json({
        success: rs ? true : false,
        rs: rs ? rs : 'Something went wrong',
    });
};

exports.updateStatus = async (req, res) => {
    const { uid, oid } = req.params;
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

// exports.getUserOrder = async (req, res) => {
//     const { _id } = req.user;
//     const response = await Order.find({ orderBy: _id });
//     return res.json({
//         success: response ? true : false,
//         rs: response ? response : 'Something went wrong',
//     });
// };

exports.getUserOrder = async (req, res) => {
    const { _id } = req.user;
    const queries = { ...req.query };
    const excludeFields = ['limit', 'sort', 'page', 'fields'];
    excludeFields.forEach((el) => delete queries[el]);

    let queryString = JSON.stringify(queries);
    queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, (el) => `$${el}`);
    const formatedQueries = JSON.parse(queryString);
    // let colorQueryObject = {};

    // // Filter
    // if (queries?.title)
    //     formatedQueries.title = { $regex: queries.title, $options: 'i' };
    // if (queries?.category)
    //     formatedQueries.category = { $regex: queries.category, $options: 'i' };
    // if (queries?.color) {
    //     delete formatedQueries.color;
    //     const colorArr = queries.color?.split(',');
    //     const colorQuery = colorArr.map((el) => ({
    //         color: { $regex: el, $options: 'i' },
    //     }));
    //     colorQueryObject = { $or: colorQuery };
    // }
    // let queryObject = {};
    // if (queries?.q) {
    //     delete formatedQueries.q;
    //     queryObject = {
    //         $or: [
    //             { color: { $regex: queries.q, $options: 'i' } },
    //             { title: { $regex: queries.q, $options: 'i' } },
    //             { categories: { $regex: queries.q, $options: 'i' } },
    //         ],
    //     };
    // }
    const qr = { ...formatedQueries, orderBy: _id };
    let queryCommand = Order.find(qr);
    const counts = await Order.find(qr).countDocuments();

    // SORT
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        queryCommand = queryCommand.sort(sortBy);
    }

    // FIELDS LIMIT
    if (req.query.fields) {
        const fields = req.query.fields.split(',').join(' ');
        queryCommand = queryCommand.select(fields);
    }

    //

    const page = +req.query.page || 1;
    const limit = +req.query.limit || process.env.LIMIT_PRODUCTS;
    const skip = (page - 1) * limit;
    queryCommand.skip(skip).limit(limit);

    queryCommand
        .exec()
        .then((response) =>
            res.status(200).json({
                success: response ? true : false,
                order: response ? response : 'Can not find product',
                counts: counts,
            }),
        )
        .catch((err) => console.log(err));
};

exports.confirmUser = async (req, res) => {
    const { uid, oid } = req.params;
    const response = await Order.findByIdAndUpdate(
        oid,
        { status: 'Confirmed' },
        { new: true },
    );
    return res.json({
        success: response ? true : false,
        rs: response ? response : 'Something went wrong',
    });
};
