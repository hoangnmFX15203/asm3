const jwt = require('jsonwebtoken');

const verifyAccessToken = async (req, res, next) => {
    if (req?.headers?.authorization?.startsWith('Bearer')) {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.JWT_SEC, (err, decode) => {
            if (err)
                return res
                    .status(401)
                    .json({ success: false, mes: 'Invalid access token' });
            req.user = decode;
            next();
        });
    } else {
        return res
            .status(401)
            .json({ success: false, mes: 'Require authentication' });
    }
};

const isAdmin = async (req, res, next) => {
    const { isAdmin } = req.user;
    if (+isAdmin !== 1)
        return res.status(401).json({
            success: false,
            message: 'You do not have permission to access',
        });
    next();
};

module.exports = {
    verifyAccessToken,
    isAdmin,
};
