const { userSchema, cardSchema, profileSchema } = require('../models/validations');
const { errorResponse } = require('../utils/responseHandler');

const validateRequest = (schema) => async (req, res, next) => {
    try {
        await schema.validateAsync(req.body, { abortEarly: false });
        next();
    } catch (error) {
        if (error.isJoi) {
            return errorResponse(res, {
                errors: error.details.map(detail => ({
                    message: detail.message,
                    field: detail.path[0]
                }))
            }, 400);
        }
        next(error);
    }
};

module.exports = {
    // User validations
    validateUser: validateRequest(userSchema.register),
    validateUserUpdate: validateRequest(userSchema.update),
    validateLogin: validateRequest(userSchema.login),
    
    // Card validations
    validateCard: validateRequest(cardSchema.create),
    validateCardUpdate: validateRequest(cardSchema.update),
    
    // Profile validations
    validateProfileUpdate: validateRequest(profileSchema.update),
    validatePasswordUpdate: validateRequest(profileSchema.passwordUpdate),
    validateEmailUpdate: validateRequest(profileSchema.emailUpdate)
};