const {
  getUserAddressList,
  postUserAddress,
  deleteAddress,
  userAddressEdit
} = require("../Service/checkout.service");

const getUserAddress = async (req, res) => {
  
  let { useremail } = req.user;
  try {
    const response = await getUserAddressList(useremail);
    res.status(201).json({ message: response });
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const addUserAddress = async (req, res) => {
  try {
    let address = await postUserAddress(req.body);
    res.status(201).json({ message: address });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const editUserAddress = async (req, res) => {
  try {
    let editAddress = await userAddressEdit(req.body)
    res.status(201).json({ message: editAddress });
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

const deleteUserAddress = async (req, res) => {
  let addressId = req.body._id
  let useremail = req.body.useremail
  
  try {
    let response = await deleteAddress(addressId, useremail)
    res.status(200).json({ message: response })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

module.exports = { getUserAddress, addUserAddress, deleteUserAddress, editUserAddress };
