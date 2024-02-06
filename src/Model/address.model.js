const mongoose = require("mongoose");
const validator = require("validator");
//const addressType = ["Home","Work","Other"]

const customeraddress = new mongoose.Schema({
  phoneNumber: {
    type: Number,
    required: true,
    minlength:10 
  },
  username: {
    type: String,
    required: true,
    maxlength: 20,
    minlength: 3,
  },
  useremail: {
    type: String,
    trim: true,
    required: true,
    lowercase: true,
    validate: (value) => validator.isEmail(value),
  },
  useraddress: {
    type: String,
    required: true,
    maxlength: 100,
    minlength: 10,
  },
  pincode: {
    type: Number,
    required: true,
    minlength: 6,
  },
  city: {
    type: String,
    required: true,
    maxlength: 20,
    minlength: 3,
  },
  state: {
    type: String,
    required: true,
    maxlength: 20,
    minlength: 3,
  },
  addressType: {
    type: String,
    required: true, 
    maxlength: 20,
   
  },
});

const AddressModel = mongoose.model("Address", customeraddress);

module.exports = AddressModel;
module.exports.customeraddress = customeraddress;
