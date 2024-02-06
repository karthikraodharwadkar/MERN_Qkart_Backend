const router = require("express").Router();
const { getUserAddress, addUserAddress, editUserAddress, deleteUserAddress } = require("../../Controller/checkout.controller")

const authValidate = require("../../Middleware/auth.middleware")
const validatePincode = require("../../Middleware/pincode.middleware")


router.get("/", authValidate, getUserAddress)

router.post("/", validatePincode, addUserAddress)

router.put("/", validatePincode, editUserAddress)

router.delete("/", deleteUserAddress)


module.exports = router     