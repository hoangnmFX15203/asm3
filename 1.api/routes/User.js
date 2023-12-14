const router = require('express').Router();
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require('./verifyToken');
const controller = require('../controller/User');
const { verifyAccessToken, isAdmin } = require('../middleware/verifyToken');

//UPDATE
// router.put('/:id', controller.updateUser);

// DELETE
router.delete('/:id', controller.deleteUser);

// GET USER
router.get('/current', verifyAccessToken, controller.getUser);

// GET ALL USER
router.get('/', [verifyAccessToken, isAdmin], controller.getUsers);

// DELETE USER
router.delete('/:uid', [verifyAccessToken, isAdmin], controller.deleteUser);

// UPDATE CURRENT USER
router.put('/current', verifyAccessToken, controller.updateUser);

// UPDATE USER ADDRESS
router.put('/address', verifyAccessToken, controller.updateUserAddress);

// UPDATE CART
router.put('/cart', verifyAccessToken, controller.updateCart);

// REMOVE CART
router.delete('/remove-cart/:pid', verifyAccessToken, controller.removeProductInCart);


// UPDATE USER BY ADMIN
router.put('/:uid', [verifyAccessToken, isAdmin], controller.updateUserByAdmin);

module.exports = router;
