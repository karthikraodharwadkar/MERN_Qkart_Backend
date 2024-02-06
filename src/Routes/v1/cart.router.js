const router = require("express").Router();
const {
  getCartItems,
  addItemtoCart,
  updateCartItem,getUserRegistration
} = require("../../Controller/cartItems.controller");
// const passport = require("passport")
// const authenticate = passport.authenticate("jwt", { session: false });


const authValidate = require("../../Middleware/auth.middleware")
const validate = require("../../Middleware/validateRegister.middleware")
const {addCartItems} = require("../../Validation/cart.validation")

const cartValidation = validate(addCartItems)

router.get("/",authValidate, getCartItems);
router.post("/",authValidate, addItemtoCart);
router.put("/",authValidate,updateCartItem)

module.exports = router;
