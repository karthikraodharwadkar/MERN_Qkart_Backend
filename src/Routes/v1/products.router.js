const router = require("express").Router();
const {
    getProducts,
  } = require("../../Controller/register.controller");
  

router.get("/", getProducts);

module.exports = router;
