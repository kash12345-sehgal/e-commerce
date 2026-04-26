import OrderModel from "../models/orderModel.js";
import userModel from "../models/userModels.js";

// placing order using cash on delivery
const placeOrder = async (req, res) => {
    try {
        const { userId, items,amount,address } = req.body; 
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "cash on delivery",
            paymentStatus: false,
            date: Date.now()
        }
        const newOrder = new OrderModel(orderData);
        await newOrder.save();
        await userModel.findByIdAndUpdate(userId,{cartData:{}})
        res.json({ success: true, message: "Order placed successfully" })
    }   catch (error) { 
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}
//  placing order using razorpay
const placeOrderRazorpay = async (req, res) => {

}
// placing order using stripe
const placeOrderStripe = async (req, res) => {

}

// all order data from admin panel
const allOrders = async (req, res) => {
    try {
        const orders = await OrderModel.find({});
        res.json({ success: true,  orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}
// user data for frontend
const userOrders = async (req, res) => {
    try {
        const userId = req.body.userId; // Auth middleware se userId milta hai
        const orders = await OrderModel.find({ userId })
        res.json({ success: true, ordersData: orders })

}catch (error) {
console.log(error); 
res.json({ success: false, message: error.message })
}
}
// update order status from admin panel
const updateStatus = async (req, res) => {

}
export { placeOrder, placeOrderRazorpay, placeOrderStripe, allOrders, userOrders, updateStatus }