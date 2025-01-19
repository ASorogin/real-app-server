const successResponse = (res, data, statusCode = 200) => {
    res.status(statusCode).json(data);
};

const errorResponse = (res, error, statusCode = 500) => {
    res.status(statusCode).json({
        error: error.message || error
    });
};

module.exports = {
    successResponse,
    errorResponse
};