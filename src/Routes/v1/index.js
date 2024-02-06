const router = require("express").Router()
const auth = require("./auth.router")
const products = require("./products.router")
const cart = require("./cart.router")
const checkout = require("./checkout.router")
const profile = require("./profile.router")

router.use("/auth",auth)
router.use("/products",products)
router.use("/cart",cart)
router.use("/checkout",checkout)
//router.use("/profile",profile)

module.exports = router