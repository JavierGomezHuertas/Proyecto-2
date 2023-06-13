const Joi = require("joi");

const loginPayloadSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

module.exports = (req, res, next) => {
    const { error } = loginPayloadSchema.validate(req.body);
    if (error) {
        res.status(400).json({ error: error.details[0].message });
    } else {
        next();
    }
};
