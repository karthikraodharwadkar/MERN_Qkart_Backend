const Joi = require("joi");
const {password} = require("./custom.validation")

const register = Joi.object().keys({
    username: Joi.string().required(),
    useremail: Joi.string().email().required(),
    password: Joi.string().required().custom(password)
})

const login = Joi.object().keys({
    username: Joi.string().required(),
    useremail: Joi.string().email().required(),
    password: Joi.string().required().custom(password)
})

module.exports = { register,login }