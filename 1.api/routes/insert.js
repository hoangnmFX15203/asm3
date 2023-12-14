const router = require('express').Router();
const controller = require('../controller/insertData');

//UPDATE
// router.put('/:id', controller.updateUser);

// CREATE ORDER
router.post('/', controller.insertProduct);

module.exports = router;
