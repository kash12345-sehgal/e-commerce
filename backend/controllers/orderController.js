import orderModel from "../models/orderModel.js";
import OrderModel from "../models/orderModel.js";
import userModel from "../models/userModels.js";
import Razorpay from "razorpay";
import Stripe from "stripe";

// global variable
const currency = "inr"
const deliveryCharge = 10
// gateway initialize

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})
// placing order using cash on delivery
const placeOrder = async (req, res) => {
    try {
        const { userId, items,amount,address   } = req.body; 
const orderData = {
            userId,
            items,
            status: "OrderPlaced",
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
// Verify stripe
const verifyStripe = async (req, res) => {
    const {orderId, success, userId } = req.body;
    try{
if(success === 'true'){
    await OrderModel.findByIdAndUpdate(orderId, { paymentStatus: true })
    await userModel.findByIdAndUpdate(userId,{cartData:{}})
    res.json({ success: true })
}else{
    await OrderModel.findByIdAndDelete(orderId)
    res.json({ success: false, message: "Payment Failed" })

}

    }catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }
}
// placing order using stripe
const placeOrderStripe = async (req, res) => {
    try{
        const { userId, items,amount,address   } = req.body; 
        const {origin} = req.headers
        const orderData = {
            userId,
            items,
            status: "OrderPlaced",
            amount,
            address,
            paymentMethod: "Stripe",
            paymentStatus: false,
            date: Date.now()
        }
const newOrder = new OrderModel(orderData);
        await newOrder.save();
        const line_items = items.map((item)=>({
    price_data:{
        currency:currency,
        product_data:{
            name: item.name,
        },
        unit_amount: item.price * 100
    },
    quantity: item.quantity
}))


        line_items.push({
            price_data:{
        currency:currency,
        product_data:{
            name: 'Delivery Charges',
        },
        unit_amount: deliveryCharge * 100
    },
    quantity: 1

        })
        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment'
        })
        res.json({ success: true, session_url: session.url })
        

    }catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }

}

//  placing order using razorpay
const placeOrderRazorpay = async (req, res) => {
    try{
        const { userId, items,amount,address   } = req.body; 
        
        const orderData = {
            userId,
            items,
            status: "OrderPlaced",
            amount,
            address,
            paymentMethod: "Razorpay",
            paymentStatus: false,
            date: Date.now()
        }
const newOrder = new OrderModel(orderData);
        await newOrder.save();
        const options = {
    amount: amount * 100,
    currency: currency.toUpperCase(),
    receipt: newOrder._id.toString()
        }
await razorpayInstance.orders.create(options, (error, order) => {

            if(error){
                console.log(error);
                res.json({ success: false, message: error.message })

            }
            res.json({ success: true, order })
    })
    }catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }
}

const verifyRazorpay = async(req,res) => {
 try{
const{userId,razorpay_order_id} = req.body
const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
if(orderInfo.status==='paid'){
    await orderModel.findByIdAndUpdate(orderInfo.receipt,{payment:true})
    await userModel.findByIdAndUpdate(userId,{cartData:{}})
    res.json({success:true,message:"Payment Successful"})

}else{
    res.json({success:false,message:'Payment Failed'})
}
 
}catch(error){
    console.log(error);
        res.json({ success: false, message: error.message })

}

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
try{
    const { orderId, status } = req.body;
    await OrderModel.findByIdAndUpdate(orderId, { status })
    res.json({ success: true, message: "Status Updated " })
}catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })
}
}
export { verifyRazorpay,verifyStripe, placeOrder, placeOrderRazorpay, placeOrderStripe, allOrders, userOrders, updateStatus }