const mongoose = require("mongoose")
const { productsSchema } = require("./products.model")

const cartSchema = new mongoose.Schema({
    useremail: {
        type: String,
        required: true,
        unique: true
    },
    cartItems: [
        { product: productsSchema, quantity: Number }
    ]
},{timestamps:false})

const CartModel = mongoose.model("CartItems", cartSchema)

module.exports = CartModel