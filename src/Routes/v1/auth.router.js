const {
  postUserRegistration,
  postUserlogin,
  putUserRegistration,
  getUserRegistration
} = require("../../Controller/register.controller");



const router = require("express").Router();
const validate = require("../../Middleware/validateRegister.middleware");
const { register, login } = require("../../Validation/register.validation");
const authValidate = require("../../Middleware/auth.middleware")

const validatePostUserRegistration = validate(register);

const validatePostLogin = validate(login);

router.post("/register", validatePostUserRegistration, postUserRegistration);
router.post("/login", validatePostLogin, postUserlogin);
router.put("/checkout", putUserRegistration);
router.get("/register", authValidate, getUserRegistration);





module.exports = router;
