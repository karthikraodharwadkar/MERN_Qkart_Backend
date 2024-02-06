const Joi = require("joi")
const {mongoId} = require("./custom.validation")

const addCartItems = Joi.object().keys({
    productId:Joi.string().required().custom(mongoId),
    useremail: Joi.string().email().required(),
    quantity:Joi.number().required()
})

module.exports = {addCartItems}