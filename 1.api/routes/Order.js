const router = require('express').Router();
const controller = require('../controller/Order');
const { verifyAccessToken, isAdmin } = require('../middleware/verifyToken');

//UPDATE
// router.put('/:id', controller.updateUser);

// CREATE ORDER
router.post('/', verifyAccessToken, controller.createOrder);

// UPDATE STATUS
router.put('/status/:oid', verifyAccessToken, isAdmin, controller.updateStatus);

// GET ORDER BY USER
router.get('/', verifyAccessToken, controller.getUserOrder);

// GET ORDER BY ADMIN
router.get('/admin', verifyAccessToken, isAdmin, controller.getOrders);

module.exports = router;
