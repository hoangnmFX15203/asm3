const Product = require('../models/Product');
const slugify = require('slugify');
const data = require('../ecommerce.json');

const fn = async (product) => {
    await Product.create({
        title: product?.name,
        slug: slugify(product?.name) + Math.round(Math.random() * 100),
        desc: product?.description,
        brand: product?.brand,
        price: Math.round(Number(product?.price?.match(/\d/g).join('') / 100)),
        categories: product?.category[1],
        quantity: Math.round(Math.random() * 100),
        sold: Math.round(Math.random() * 100),
        img: product?.images,
        color: product?.variants?.find((el) => el.label === 'Color')
            ?.variants[0],
        thumb: product?.thumb,
        totalRatings: Math.round(Math.random() * 5),
    });
};

exports.insertProduct = async (req, res) => {
    const promises = [];
    for (let product of data) promises.push(fn(product));
    await Promise.all(promises);

    return res.status(200).json('Done');
};
