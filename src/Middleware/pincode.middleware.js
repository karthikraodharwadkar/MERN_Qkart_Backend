const axios = require("axios");

const validatePincode = async (req, res, next) => {
  const { pincode } = req.body;

  if (pincode.length < 6) {
    return res.status(404).json({ message: "Invalid Pincode" });
  }

  try {
    let response = await axios.get(
      `https://api.postalpincode.in/pincode/${pincode}`
    );
    if (response.data[0].Status == "Error") {
      return res.status(404).json({ message: "Invalid Pincode" });
    }
    return next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = validatePincode;
