const Joi = require("joi");

const registerPayloadSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    birthDate: Joi.date().required(),
    country: Joi.string(),
    acceptedTOS: Joi.bool().required(),
});

module.exports = (req, res, next) => {
    const { error } = registerPayloadSchema.validate(req.body);
    if (error) {
        res.status(400).json({ error: error.details[0].message });
    } else {
        next();
    }
};