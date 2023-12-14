const jwt = require('jsonwebtoken');

const generateToken = (uid, isAdmin) => jwt.sign({ _id: uid, isAdmin }, process.env.JWT_SEC, { expiresIn: '3d' });

const generateRefreshToken = (uid) => jwt.sign({ _id: uid }, process.env.JWT_SEC, { expiresIn: '7d' });

module.exports = {
    generateToken,
    generateRefreshToken,
};
