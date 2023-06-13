const sendError = require("../utils/send-error.js");

module.exports = (schema) => {
    return (req, res, next) => {
        const result = schema.validate(req.body);
        if (result.error) {
            const error = result.error.details[0];
            sendError(res, {
                status: 400,
                code: "VALIDATION_ERROR",
                message: result.error.details.map((err) => err.message[0]),
            });
        } else {
            next();
        }
    };
};
