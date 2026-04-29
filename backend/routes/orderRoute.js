import express from 'express';
import {placeOrder, placeOrderRazorpay, allOrders, userOrders, updateStatus,placeOrderStripe, verifyStripe , verifyRazorpay} from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js';
import Razorpay from 'razorpay';

const orderRouter = express.Router()

// admin features
orderRouter.post('/list',adminAuth, allOrders)
orderRouter.post('/status',adminAuth, updateStatus)
// payment gateway
orderRouter.post('/place',authUser, placeOrder)
orderRouter.post('/razorpay', authUser, placeOrderRazorpay)
orderRouter.post('/stripe', authUser, placeOrderStripe)
// user features
orderRouter.post('/user', authUser, userOrders)
// verify payment
orderRouter.post('/verifyStripe', authUser, verifyStripe)
orderRouter.post('/verifyRazorpay', authUser, verifyRazorpay)



export default orderRouter;

