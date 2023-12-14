const Product = require('../models/Product');
const slugify = require('slugify');

exports.createProduct = async (req, res) => {
    const { title, price, description, categories, color } = req.body;
    const thumb = req.files?.thumb[0].path;
    const images = req.files?.images.map((el) => el.path);
    if (!(title && price && categories && color && description)) {
        return res.status(400).json('Missing Input');
    }
    req.body.slug = slugify(title);
    if (thumb) req.body.thumb = thumb;
    if (images) req.body.images = images;
    const productData = {
        title: title,
        slug: req.body.slug,
        desc: req.body.description,
        quantity: req.body.quantity,
        img: req.body.images,
        thumb: req.body.thumb,
        categories: categories,
        color: color,
        price: price,
    };
    // if (Object.keys(req.body).length === 0)
    //     return res.status(401).json('Missing input');
    // if (req.body && req.body.title) req.body.slug = slugify(req.body.title);
    const newProduct = await Product.create(productData);
    return res.status(200).json({
        success: newProduct ? true : false,
        createdProduct: newProduct
            ? newProduct
            : 'Can not create a new product',
    });
};

exports.getProduct = async (req, res) => {
    const { pid } = req.params;
    const product = await Product.findById(pid);
    return res.status(200).json({
        success: product ? true : false,
        productData: product ? product : 'Can not find product',
    });
};

exports.getProducts = async (req, res) => {
    const queries = { ...req.query };
    const excludeFields = ['limit', 'sort', 'page', 'fields'];
    excludeFields.forEach((el) => delete queries[el]);

    let queryString = JSON.stringify(queries);
    queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, (el) => `$${el}`);
    const formatedQueries = JSON.parse(queryString);
    let colorQueryObject = {};

    // Filter
    if (queries?.title)
        formatedQueries.title = { $regex: queries.title, $options: 'i' };
    if (queries?.category)
        formatedQueries.category = { $regex: queries.category, $options: 'i' };
    if (queries?.color) {
        delete formatedQueries.color;
        const colorArr = queries.color?.split(',');
        const colorQuery = colorArr.map((el) => ({
            color: { $regex: el, $options: 'i' },
        }));
        colorQueryObject = { $or: colorQuery };
    }
    let queryObject = {};
    if (queries?.q) {
        delete formatedQueries.q;
        queryObject = {
            $or: [
                { color: { $regex: queries.q, $options: 'i' } },
                { title: { $regex: queries.q, $options: 'i' } },
                { categories: { $regex: queries.q, $options: 'i' } },
            ],
        };
    }
    const qr = { ...colorQueryObject, ...formatedQueries, ...queryObject };
    let queryCommand = Product.find(qr);
    // const counts = Product.find(qr).countDocuments();

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
                products: response ? response : 'Can not find product',
                // counts: counts,
            }),
        )
        .catch((err) => console.log(err));
    // async (err, response) => {
    //     if (err) return res.status(404).json(err.message);
    //     return res.status(200).json({
    //         success: response ? true : false,
    //         products: response ? response : 'Can not find product',
    //     });
    // }
};

exports.getCategories = async (req, res) => {
    const products = await Product.find();
    let categories = [
        { type: 'Smartphone', count: 0 },
        { type: 'Tablet', count: 0 },
        { type: 'Laptop', count: 0 },
        { type: 'Camera', count: 0 },
        { type: 'Printer', count: 0 },
        { type: 'Speaker', count: 0 },
        { type: 'Accessories', count: 0 },
        { type: 'Television', count: 0 },
    ];
    products.map((product) => {
        categories.forEach((category) => {
            if (product.categories === category.type) {
                category.count += 1;
            }
        });
        return categories;
    });
    return res.status(200).json({
        success: categories ? true : false,
        prodCategories: categories ? categories : 'Can not find product',
    });
};

exports.updateProduct = async (req, res) => {
    console.log(req.body);
    const { title, price, description, categories, color } = req.body;
    const { pid } = req.params;
    const files = req?.files;
    if (files?.thumb) req.body.thumb = files?.thumb[0]?.path;
    if (files?.images) req.body.images = files?.images?.map((el) => el.path);
    if (req.body && req.body.title) req.body.slug = slugify(req.body.title);
    const updateProductData = {
        title: title,
        slug: req.body.slug,
        desc: req.body.description,
        quantity: req.body.quantity,
        img: req.body.images,
        thumb: req.body.thumb,
        categories: categories,
        color: color,
        price: price,
    };
    const updatedProduct = await Product.findByIdAndUpdate(
        pid,
        updateProductData,
        {
            new: true,
        },
    );
    return res.status(200).json({
        success: updatedProduct ? true : false,
        updatedProduct: updatedProduct
            ? updatedProduct
            : 'Can not update product',
    });
};

exports.deleteProduct = async (req, res) => {
    const { pid } = req.params;
    const deleteProductProduct = await Product.findByIdAndDelete(pid);
    return res.status(200).json({
        success: deleteProductProduct ? true : false,
        mes: deleteProductProduct
            ? 'Deleted'
            : 'Can not delete product',
    });
};

exports.uploadImageProduct = async (req, res) => {
    const { pid } = req.params;
    if (!req.files) return new Error('Missing input');
    const response = await Product.findByIdAndUpdate(
        pid,
        {
            $push: { img: { $each: req.files.map((el) => el.path) } },
        },
        { new: true },
    );
    return res.status(200).json({
        status: response ? true : false,
        updatedProduct: response ? response : 'Can not upload images Product',
    });
};
