import mongoose from "mongoose";

const ProdustSchema  = new mongoose.Schema({
    image : String,
    title : String, 
    description : String,
    category : String,
    brand : String,
    price : Number,
    salePrice : Number,
    totalStock : Number
},{timestamps : true})

export default mongoose.model("product", ProdustSchema)