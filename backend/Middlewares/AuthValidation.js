const joi = require('joi'); // Ensure lowercase 'joi'

const signupValidation = (req, res, next) => {
    const schema = joi.object({
        name: joi.string().min(3).required(),
        email: joi.string().email().required(),
        password: joi.string().min(4).required(), // Fixed "passwords" typo
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

const loginValidation = (req, res, next) => {
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(4).required(), // Fixed "passwords" typo
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

module.exports = {
    signupValidation,
    loginValidation
};
