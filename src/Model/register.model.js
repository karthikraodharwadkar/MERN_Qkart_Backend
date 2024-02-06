const mongoose = require("mongoose");
const validator = require("validator");

const registerSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      minlength: 3,
      maxlength: 20,
      unique: true,
    },
    useremail: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
      validate: (value) => validator.isEmail(value),
    },
    password: {
      type: String,
      trim: true,
      required: true,
      minlength: 3,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error(
            "Password must contain at least one letter and one number"
          );
        }
      },
    },
    walletMoney: { type: Number, required: true, default: 5000 },
    cart: { type: [String], trim: true, required: true, default: [] },
    addresses: { type: [String], trim: true, required: true, default: [] },
  },
  { timestamps: true }
);

const RegisterModel = mongoose.model("RegisterModel", registerSchema);

module.exports = RegisterModel;
