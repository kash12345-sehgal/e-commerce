import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId:{type:String,required:true},
    items:{type:Object,required:true},
    amount:{type:Number,required:true},
    address:{type:Object,required:true},
    status:{type:String,required:true,default:"order placed"},
    paymentMethod:{type:String,required:true},
    paymentStatus:{type:Boolean,required:true , default:false},
    date:{type:Number,required:true}
})
const orderModel = mongoose.model('orders',orderSchema)
export default orderModel;