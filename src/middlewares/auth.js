const jwt = require('jsonwebtoken');
const { errorResponse } = require('../utils/responseHandler');

exports.auth = async (req, res, next) => {
    try {
        const token = req.header('x-auth-token');
        if (!token) {
            return errorResponse(res, 'No token, authorization denied', 401);
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        errorResponse(res, 'Token is not valid', 401);
    }
};