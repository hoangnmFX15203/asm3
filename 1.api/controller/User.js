const CryptoJS = require('crypto-js');
const User = require('../models/User');
const { response } = require('express');

// exports.updateUser = async (req, res) => {
//     if (req.body.password) {
//         req.body.password = CryptoJS.AES.encrypt(
//             req.body.password,
//             process.env.PASS_SEC,
//         ).toString();
//     }
//     try {
//         const updateUser = await User.findByIdAndUpdate(
//             req.params.id,
//             {
//                 $set: req.body,
//             },
//             { new: true },
//         );
//         res.status(200).json(updateUser);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// };

// exports.deleteUser = async (req, res) => {
//     try {
//         await User.findByIdAndDelete(req.params.id);
//         res.status(200).json('Deleted');
//     } catch (err) {
//         res.status(500).json(err);
//     }
// };

exports.getUser = async (req, res) => {
    const { _id } = req.user;
    try {
        const user = await User.findById(_id).select('-refreshToken -password').populate({
            path: 'cart',
            populate: {
                path: 'product',
                select: 'title thumb price'
            }
        });
        // console.log(user);
        // const { password, ...other } = user._doc;
        res.status(200).json({
            success: true,
            res: user ? user : 'User not found',
        });
    } catch (err) {
        // console.log(err);
        res.status(500).json(err);
    }
};

exports.getAllUser = async (req, res) => {
    const query = req.query.new;
    try {
        const users = query
            ? await User.find().sort({ _id: -1 }).limit(1)
            : await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.getUsers = async (req, res) => {
    const queries = { ...req.query };
    const excludeFields = ['limit', 'sort', 'page', 'fields'];
    excludeFields.forEach((el) => delete queries[el]);

    let queryString = JSON.stringify(queries);
    queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, (el) => `$${el}`);
    const formatedQueries = JSON.parse(queryString);

    // Filter
    if (queries?.name)
        formatedQueries.name = { $regex: queries.name, $options: 'i' };

    // const query = {}
    // if (req.query.q) {
    //     query = {$or: [
    //         {name: {$regex: req.query.q, $options: 'i'}},
    //         {email: {$regex: req.query.q, $options: 'i'}},
    //     ]}
    // }

    if (req.query.q) {
        delete formatedQueries.q;
        formatedQueries['$or'] = [
            { firstname: { $regex: req.query.q, $options: 'i' } },
            { lastname: { $regex: req.query.q, $options: 'i' } },
            { email: { $regex: req.query.q, $options: 'i' } },
        ];
    }

    let queryCommand = User.find(formatedQueries);

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
                rs: response ? response : 'Can not find user',
            }),
        )
        .catch((err) => console.log(err));
    // const response = await User.find().select('-refreshToken -password');
    // return res.status(200).json({
    //     success: response ? true : false,
    //     users: response,
    // });
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    const response = await User.findByIdAndDelete(id);
    return res.status(200).json({
        success: response ? response : false,
        mes: response
            ? `User with username ${response.username} deleted`
            : 'No user delete',
    });
};

exports.updateUser = async (req, res) => {
    const { _id } = req.user;
    const { firstname, lastname, email, mobile } = req.body;
    if (!_id || Object.keys(req.body).length === 0)
        return res.status(401).json('Missing Input');
    const response = await User.findByIdAndUpdate(
        _id,
        {
            firstname,
            lastname,
            email,
            mobile,
        },
        {
            new: true,
        },
    ).select('-password -isAdmin');
    return res.status(200).json({
        success: response ? true : false,
        mes: response ? 'Updated' : 'Something went wrong',
    });
};

exports.updateUserByAdmin = async (req, res) => {
    const { uid } = req.params;
    if (Object.keys(req.body).length === 0)
        return res.status(401).json('Missing Input');
    const response = await User.findByIdAndUpdate(uid, req.body, {
        new: true,
    }).select('-password -isAdmin -refreshToken');
    return res.status(200).json({
        success: response ? true : false,
        updatedUser: response ? response : 'Something went wrong',
        mes: response ? 'Updated' : 'Something went wrong',
    });
};

exports.updateUserAddress = async (req, res) => {
    const { _id } = req.user;
    if (!req.body.address) return res.status(401).json('Missing Input');
    const response = await User.findByIdAndUpdate(
        _id,
        { $push: { address: req.body.address } },
        {
            new: true,
        },
    ).select('-password -isAdmin -refreshToken');
    return res.status(200).json({
        success: response ? true : false,
        updatedUser: response ? response : 'Something went wrong',
    });
};

exports.updateCart = async (req, res) => {
    const { pid, quantity = 1, color, price } = req.body;
    const { _id } = req.user;
    if (!pid) return res.status(401).json('Missing Input');
    const user = await User.findById(_id).select('cart');
    let response;
    const alreadyProduct = user?.cart?.find(
        (el) => el.product.toString() === pid,
    );
    if (alreadyProduct) {
        response = await User.updateOne(
            {
                cart: { $elemMatch: alreadyProduct },
            },
            { $set: { 'cart.$.quantity': quantity, 'cart.$.color': color, price: 'cart.$.price' } },
            { new: true },
        );
        return res.status(200).json({
            success: response ? true : false,
            mes: response ? 'Updated your Cart' : 'Something went wrong',
        });
    } else {
        response = await User.findByIdAndUpdate(
            _id,
            {
                $push: { cart: { product: pid, quantity, color, price } },
            },
            { new: true },
        );
        return res.status(200).json({
            success: response ? true : false,
            mes: response ? 'Updated your Cart' : 'Something went wrong',
        });
    }
};

exports.removeProductInCart = async (req, res) => {
    const { _id } = req.user;
    const { pid } = req.params;
    const user = await User.findById(_id).select('cart');
    const alreadyProduct = user?.cart?.find(
        (el) => el.product.toString() === pid,
    );
    if (!alreadyProduct) {
        return res.status(200).json({
            success: true,
            mes: 'Updated your Cart',
        });
    }
    const response = await User.findByIdAndUpdate(
        _id,
        {
            $pull: { cart: { product: pid } },
        },
        { new: true },
    );
    return res.status(200).json({
        success: response ? true : false,
        mes: response ? 'Removed Product from Your Cart' : 'Something went wrong',
    });
};
