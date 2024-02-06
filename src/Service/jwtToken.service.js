const jwt = require("jsonwebtoken");

const generateAccessToken = async (data) => {
  const token = jwt.sign({user:data.username}, process.env.SECRET_KEY, { expiresIn: "6h" });
  return {
    access: {
      token: token,
    },
  };
};

module.exports = { generateAccessToken };
