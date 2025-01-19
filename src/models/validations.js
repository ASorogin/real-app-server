const Joi = require('joi');

const userSchema = {
    register: Joi.object({
        name: Joi.string()
            .min(2)
            .max(50)
            .required()
            .trim(),
        email: Joi.string()
            .email()
            .required()
            .trim()
            .lowercase(),
        password: Joi.string()
            .min(6)
            .required(),
        biz: Joi.boolean()
            .required()
    }),

    update: Joi.object({
        name: Joi.string()
            .min(2)
            .max(50)
            .trim(),
        email: Joi.string()
            .email()
            .trim()
            .lowercase(),
        biz: Joi.boolean()
    }),

    login: Joi.object({
        email: Joi.string()
            .email()
            .required()
            .trim()
            .lowercase(),
        password: Joi.string()
            .required()
    })
};



const cardSchema = {
    create: Joi.object({
        bizName: Joi.string()
            .min(2)
            .max(255)
            .required()
            .trim(),
        bizDescription: Joi.string()
            .min(2)
            .max(1024)
            .required()
            .trim(),
        bizAddress: Joi.string()
            .min(2)
            .max(400)
            .required()
            .trim(),
        bizPhone: Joi.string()
            .min(9)
            .max(10)
            .required()
            .trim()
            .pattern(/^0[2-9]\d{7,8}$/),
        bizImage: Joi.string()
            .min(11)
            .max(1024)
            .required()
            .uri()
    }),

    update: Joi.object({
        bizName: Joi.string()
            .min(2)
            .max(255)
            .trim(),
        bizDescription: Joi.string()
            .min(2)
            .max(1024)
            .trim(),
        bizAddress: Joi.string()
            .min(2)
            .max(400)
            .trim(),
        bizPhone: Joi.string()
            .min(9)
            .max(10)
            .trim()
            .pattern(/^0[2-9]\d{7,8}$/),
        bizImage: Joi.string()
            .min(11)
            .max(1024)
            .uri()
    })
};

const profileSchema = {
    update: Joi.object({
        name: Joi.string().min(2).max(50),
        phone: Joi.string().pattern(/^0[2-9]\d{7,8}$/),
        address: Joi.object({
            street: Joi.string(),
            city: Joi.string(),
            state: Joi.string(),
            country: Joi.string(),
            zip: Joi.string()
        }),
        bio: Joi.string().max(1024),
        image: Joi.string().uri(),
        website: Joi.string().uri()
    }),
    
    passwordUpdate: Joi.object({
        currentPassword: Joi.string().required(),
        newPassword: Joi.string().min(6).required()
    }),

    emailUpdate: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })
};


module.exports = {
    userSchema,  
    cardSchema,
    profileSchema
};
