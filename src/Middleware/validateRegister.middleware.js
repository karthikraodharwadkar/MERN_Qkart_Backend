//const register = require("../Validation/register.validation")

const validateSchema = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json(error.message)
    }
    else {
        next()
    }
}

module.exports = validateSchema