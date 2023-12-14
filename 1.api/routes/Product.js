const router = require('express').Router();
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require('./verifyToken');
const controller = require('../controller/Product');
const { verifyAccessToken, isAdmin } = require('../middleware/verifyToken');
const uploader = require('../config/cloudinary.config');

// CREATE PRODUCT
router.post(
    '/',
    [verifyAccessToken, isAdmin],
    uploader.fields([
        { name: 'images', maxCount: 10 },
        { name: 'thumb', maxCount: 1 },
    ]),
    controller.createProduct,
);

// GET PRODUCTS
router.get('/', controller.getProducts);

// UPLOAD IMAGE
router.put(
    '/uploadimage/:pid',
    [verifyAccessToken, isAdmin],
    uploader.array('image', 10),
    controller.uploadImageProduct,
);

// UPDATE PRODUCT
router.put(
    '/:pid',
    verifyAccessToken,
    isAdmin,
    uploader.fields([
        { name: 'images', maxCount: 10 },
        { name: 'thumb', maxCount: 1 },
    ]),
    controller.updateProduct,
);

// DELETE PRODUCT
router.delete('/:pid', [verifyAccessToken, isAdmin], controller.deleteProduct);

// GET CATEGORIES
router.get('/prodcategory', controller.getCategories);

// GET PRODUCT
router.get('/:pid', controller.getProduct);

module.exports = router;
