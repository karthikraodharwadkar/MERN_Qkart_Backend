const mongoose = require("mongoose")

const productsSchema = new mongoose.Schema({
    id:{type:Number,required:true},
    title:{type:String,required:true,trim:true},
    description:{type:String,required:true,trim:true},
    price:{type:Number,required:true},
    discountPercentage:{type:Number,required:true},
    rating:{type:Number,required:true},
    stock:{type:Number,required:true},
    brand:{type:String,required:true,trim:true},
    category:{type:String,required:true,trim:true},
    thumbnail:{type:String,required:true,trim:true},
    images:{type:[String],required:true,trim:true},
})

const ProductModel = mongoose.model("ProductsModel",productsSchema)

module.exports = ProductModel
module.exports.productsSchema = productsSchema
