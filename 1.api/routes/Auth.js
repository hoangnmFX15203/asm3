const router = require('express').Router();

const controller = require('../controller/Auth');
const { verifyAccessToken } = require('../middleware/verifyToken');

// REGISTER
router.post('/register', controller.register);

//LOGIN
router.post('/login', controller.login);

// LOGOUT
router.get('/logout', controller.logout);

module.exports = router;
