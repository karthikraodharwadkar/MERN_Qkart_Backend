const CartModel = require("../Model/cart.model");
const ProductModel = require("../Model/products.model");
const RegisterModel = require("../Model/register.model");
const mongoose = require("mongoose")

const getUserCartItems = async (useremail) => {
  let response = await CartModel.findOne({ useremail });

  if (!response) {
    throw new Error("User doesnot have a cart");
  }
  return response;
};

const addItemsToCart = async (data, productId, quantity) => {
  let cart = await CartModel.findOne({ useremail: data.useremail });
  //console.log(data,productId,quantity)
  if (!cart || cart==null) {
    try {
      cart = await CartModel.create({
        useremail: data.useremail,
        cartItems: [],
      });
      await cart.save();
    } catch (error) {
      console.log(error)
      throw new Error("Cart Creation Failed");
    }
  }

  let isItemExist = cart.cartItems.findIndex(
    (item) => item.product._id == productId
  );

  if (isItemExist !== -1) {
    throw new Error(
      "Product already in cart."
    );
  }

  let product = await ProductModel.findOne({ _id: productId });
  if (!product) {
    throw new Error("Product doesn't exist in database");
  }

  product.stock = product.stock - 1;

  await product.save();
  cart.cartItems.push({ product, quantity });
  await cart.save();
  return cart;
};

// const addItemsToCart = async (data, productId, quantity, title) => {
//   const session = await mongoose.startSession();
//   session.startTransaction();

//   try {
//     let cart = await CartModel.findOne({ useremail: data.useremail }).session(session);

//     if (!cart) {
//       cart = await CartModel.create(
//         {
//           useremail: data.useremail,
//           cartItems: [],
//         },
//         { session }
//       );
//     }

//     let isItemExist = cart.cartItems.findIndex((item) => item.product._id == productId);

//     if (isItemExist !== -1) {
//       throw new Error("Product already in cart.");
//     }

//     let product = await ProductModel.findOne({ _id: productId }).session(session);
//     if (!product) {
//       throw new Error("Product doesn't exist in the database");
//     }

//     if (product.stock < 1) {
//       throw new Error("Product is out of stock");
//     }

//     product.stock = product.stock - 1;

//     await product.save();
//     cart.cartItems.push({ product, quantity });
//     await cart.save();

//     await session.commitTransaction();
//     session.endSession();

//     return cart;
//   } catch (error) {
//     await session.abortTransaction();
//     session.endSession();
//     throw error;
//   }
// };

const updateItemsInCart = async (data, productId, quantity) => {
  let cart = await CartModel.findOne({ useremail: data.useremail });
  if (!cart) {
    throw new Error(
      "User does not have a cart. Use POST to create cart and add a product"
    );
  }

  let product = await ProductModel.findOne({ _id: productId });
  if (!product) {
    throw new Error("Product doesn't exist in database");
  }


  let productIndex = cart.cartItems.findIndex(
    (item) => item.product._id == productId
  );


  if (productIndex == -1) {
    throw new Error("Product not in cart");
  }


  if (cart.cartItems[productIndex].quantity >= quantity) {
    product.stock = product.stock + 1;
  }


  if (product.stock == 0) {
    throw new Error("MOQ Breached");
  }

  if (cart.cartItems[productIndex].quantity < quantity) {
    product.stock = product.stock - 1;
  }


  if (quantity === 0) {
    cart.cartItems.splice(productIndex, 1);
  } else {
    cart.cartItems[productIndex].quantity = quantity;
  }

  await product.save();
  await cart.save();
  return cart;
};

module.exports = { getUserCartItems, addItemsToCart, updateItemsInCart };
