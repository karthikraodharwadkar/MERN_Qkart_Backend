require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const Routes = require("./Routes/v1");
const mongoose = require("mongoose");
const passport = require("passport");
const configurePassport = require("./config/passport");

configurePassport(passport);

app.use(cors());
app.use(express.json());


app.use(passport.initialize())
// passport.use("jwt",configurePassport)

//const DB_URI = "mongodb://127.0.0.1:27017/qkart"
const DB_URI = process.env.DB_URI

mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("connected to Mongo");
    app.listen(process.env.PORT, () => {
      console.log(`connected to server ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/", Routes);
