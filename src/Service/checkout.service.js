
const AddressModel = require("../Model/address.model");
const CheckoutAddressModel = require("../Model/checkoutaddress.model");
const RegisterModel = require("../Model/register.model");
const mongoose = require("mongoose")

const getUserAddressList = async (useremail) => {
  let response = await CheckoutAddressModel.findOne({ useremail });
  return response;

};

const postUserAddress = async (user) => {
  try {
    // Check if the user has an existing address document
    let userAddress = await CheckoutAddressModel.findOne({
      useremail: user.userTokenEmail,
    });

    //let response = await RegisterModel.findOne({ useremail: user.userTokenEmail })


    // If not, create a new CheckoutAddressModel document for the user
    if (!userAddress) {
      userAddress = await CheckoutAddressModel.create({
        useremail: user.userTokenEmail,
        useraddresses: [],
      });

      await userAddress.save();
    }

    // Create a new address document
    const address = await AddressModel.create({
      phoneNumber: user.phoneNumber,
      username: user.username,
      useremail: user.useremail,
      useraddress: user.useraddress,
      pincode: user.pincode,
      city: user.city,
      state: user.state,
      addressType: user.addressType,
    });

    // Save the address document
    await address.save();


    // Update the user's address list
    userAddress.useraddresses.push({ address: address });

    await userAddress.save(); 
    return userAddress;
  } catch (error) {
    // Handle any errors that occurred during the process
    throw new Error(`Failed to add user address: ${error.message}`);
  }
};

const userAddressEdit = async (user) => {
  try {
    let isUserExist = await CheckoutAddressModel.findOne({
      useremail: user.userTokenEmail,
    });
    if (!isUserExist) {
      throw new Error("User Not Found");
    }

    if (!mongoose.Types.ObjectId.isValid(user._id)) {
      user._id = new mongoose.Types.ObjectId(user._id);
    }

    await AddressModel.updateOne(
      { _id: user._id  },
      {
        $set: {
          phoneNumber: user.phoneNumber,
          username: user.username,
          useremail: user.useremail,
          useraddress: user.useraddress,
          pincode: user.pincode,
          city: user.city,
          state: user.state,
          addresstype: user.addressType,
        },
      }
    );

    let findAddressIndex = isUserExist.useraddresses.findIndex(
      (item) => item.address._id.equals(user._id)
    );

    if (findAddressIndex === -1) {
      throw new Error("User address not found");
    }

    isUserExist.useraddresses[findAddressIndex].address = {
      _id: user._id,
      phoneNumber: user.phoneNumber,
      username: user.username,
      useremail: user.useremail,
      useraddress: user.useraddress,
      pincode: user.pincode,
      city: user.city,
      state: user.state,
      addressType: user.addressType,
    };

    await isUserExist.save();


  } catch (error) {
    throw new Error(`Failed to edit user address: ${error.message}`);
  }
};

const deleteAddress = async (id, useremail) => {

  try {
    let isUserExist = await CheckoutAddressModel.findOne({ useremail });
    if (!isUserExist) {
      throw new Error("User not found");
    }

    let findUserAddressIndex = isUserExist.useraddresses.findIndex(
      (item) => item.address._id == id
    );

    if (findUserAddressIndex === -1) {
      throw new Error("User address not found");
    }

    isUserExist.useraddresses.splice(findUserAddressIndex, 1);
    await isUserExist.save();
  
    await AddressModel.deleteOne({ _id: id });


    return isUserExist

  } catch (error) {
    throw new Error(`Failed to delete user address: ${error.message}`);
  }
};
module.exports = {
  getUserAddressList,
  postUserAddress,
  deleteAddress,
  userAddressEdit,
};
