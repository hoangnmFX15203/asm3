const CryptoJS = require('crypto-js');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { generateToken, generateRefreshToken } = require('../middleware/jwt');

exports.register = async function (req, res) {
    const { username, email, password, firstname, lastname } = req.body;
    if (!username || !email || !password || !firstname || !lastname) {
        return res.status(400).json({ mess: 'missing input', success: false });
    }
    try {
        const isEmail = await User.findOne({ email: email });
        const isUserName = await User.findOne({ username: username });
        if (isEmail && isUserName) {
            throw new Error('Account existed');
        } else {
            const newUser = await User.create(req.body);
            return res.status(200).json({
                success: newUser ? true : false,
                message: newUser ? 'Register success' : 'Register fail',
            });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.login = async function (req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ mess: 'missing input', success: false });
    }
    try {
        const response = await User.findOne({ username: username });
        if (response && (await response.isCorrectPassword(password))) {
            const { password, isAdmin, refreshToken, ...userData } =
                response.toObject();
            const accessToken = generateToken(response._id, isAdmin);
            const newRefreshToken = generateRefreshToken(response._id);
            await User.findByIdAndUpdate(
                response._id,
                { refreshToken: newRefreshToken },
                { new: true },
            );
            res.cookie('refreshToken', newRefreshToken, {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
            return res.status(200).json({
                success: true,
                accessToken,
                userData,
                isAdmin,
                mess: 'Login Success',
            });
        } else {
            res.status(401).json('Login fail');
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.refreshAccessToken = async (req, res) => {
    const cookie = req.cookies;
    if (!cookie && !cookie.refreshToken)
        throw new Error('No refresh token available');
    const rs = await jwt.verify(cookie.refreshToken, process.env.JWT_SEC);
    const response = await User.findOne({
        _id: rs._id,
        refreshToken: rs.refreshToken,
    });
    return res.status(200).json({
        success: response ? true : false,
        newAccessToken: response
            ? generateToken(response._id, response.isAdmin)
            : 'Refresh Token is not match',
    });
};

exports.logout = async (req, res, next) => {
    const cookie = req.cookies;
    if (!cookie || !cookie.refreshToken) throw new Error('You are not login');
    await User.findOneAndUpdate(
        { refreshToken: cookie.refreshToken },
        { refreshToken: '' },
        { new: true },
    );
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true,
    });
    return res.status(200).json({
        success: true,
        mes: 'Logout is done',
    });
};
