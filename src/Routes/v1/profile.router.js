const router = require("express").Router();

const {deleteUserAddressProfile,editUserAddressProfile} = require("../../Controller/profile.controller")

router.delete("/",deleteUserAddressProfile)
router.put("/",editUserAddressProfile)

module.exports = router