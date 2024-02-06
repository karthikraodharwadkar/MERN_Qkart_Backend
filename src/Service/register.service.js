const AddressModel = require("../Model/address.model");
const CartModel = require("../Model/cart.model");
const CheckoutAddressModel = require("../Model/checkoutaddress.model");
const ProductModel = require("../Model/products.model");
const RegisterModel = require("../Model/register.model");
const bcrypt = require("bcryptjs");

const createUserRegistration = async (data) => {
  try {
    let isUserExist = await RegisterModel.findOne({useremail:data.useremail})
    if(isUserExist){
      throw new Error("User already registered")
    }

    let hashedPassword = await bcrypt.hash(data.password, 10);
    let response = await RegisterModel.create({
      ...data,
      password: hashedPassword,
    });
    await response.save();

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const loginUserWithEmailAndPassword = async (username, password, useremail) => {
  try {
    let isUserEmailExist = await RegisterModel.findOne({ useremail })
    if (!isUserEmailExist) {
      throw new Error("Useremail not found, please register")
    }

    if (isUserEmailExist) {
      let passwordCheck = await bcrypt.compare(password, isUserEmailExist.password)
      if (!passwordCheck) {
        throw new Error("Invalid Password");
      } else {
        return isUserEmailExist;
      }
    } else {
      throw new Error("User Not Found");
    }
  } catch (error) {
    throw new Error(error.message);
  }

};

const getProductsData = async () => {
  let data = await ProductModel.find({})
  return data
}

const patchUserRegistration = async (user) => {
  try {
    let isUserExist = await RegisterModel.findOne({ useremail: user.userTokenEmail })
    if (!isUserExist) {
      throw new Error("User not registered")
    }

    if (user.walletMoney > isUserExist.walletMoney) {
      throw new Error("Insufficient wallet balance")
    }

    let isCartExist = await CartModel.findOne({ useremail: user.userTokenEmail })
    if (!isCartExist) {
      throw new Error("User doesnot have a cart")
    }

    let isAddressExist = await CheckoutAddressModel.findOne({ useremail: user.userTokenEmail })
    if (!isAddressExist) {
      throw new Error("User doesnot have saved addresses")
    }

    let isUpdateExist = await AddressModel.find({})


    isUserExist.walletMoney = Number(isUserExist.walletMoney) - Number(user.walletMoney)

    const formattedJSONAddresses = isUpdateExist?.map(address => {
      return JSON.stringify({
        _id: address._id.toString(),
        phoneNumber: address.phoneNumber,
        username: address.username,
        useremail: address.useremail,
        useraddress: address.useraddress,
        pincode: address.pincode,
        city: address.city,
        state: address.state,
        addressType: address.addressType,
        __v: address.__v
      });
    });

    //isUserExist.addresses=[]
    isUserExist.addresses.splice(0)
    isUserExist.addresses = [...formattedJSONAddresses] 

    // const formattedJSONCartItems = isCartExist.cartItems.map(item => {
    //   return JSON.stringify({
    //     item
    //   })
    // })

    
    const formattedJSONCartItems = isCartExist.cartItems.map(item => {
      return JSON.stringify({
        title:item.product.title,
        _id: item.product._id.toString(),
        price:item.product.price,
        thumbnail:item.product.thumbnail,
        quantity:item.quantity,
        placedOn:new Date().toLocaleDateString("en-GB"),
      })
    })  


    isUserExist.cart = [...isUserExist.cart, ...formattedJSONCartItems]

    isCartExist.cartItems = []

    await isUserExist.save()
    await isCartExist.save()
    await isAddressExist.save()

    return isUserExist

  } catch (error) {
    throw new Error(error.message)
  }
}

const fetchUserDetails = async (useremail) => {
  try {
    let fetchUser = await RegisterModel.findOne({ useremail })
    if (!fetchUser) {
      throw new Error("User not found")
    }
        return fetchUser

  } catch (error) {
    throw new Error(error.message)
  }
}

module.exports = { fetchUserDetails, createUserRegistration, loginUserWithEmailAndPassword, getProductsData, patchUserRegistration };
