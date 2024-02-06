const mongoose = require("mongoose");
const validator = require("validator");
const { customeraddress } = require("./address.model");

const checkoutAddressSchema = new mongoose.Schema(
  {
    useremail: {
      type: String,
      required: true,
      
    },
    useraddresses: [
      {
        address: customeraddress,
      },
    ],
  },
  {
    timestamps: false,
  }
);

const CheckoutAddressModel = mongoose.model(
  "CheckoutAddress",
  checkoutAddressSchema
);

module.exports = CheckoutAddressModel;
