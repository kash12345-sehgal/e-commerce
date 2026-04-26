import express from 'express';
import {placeOrder, placeOrderRazorpay, allOrders, userOrders, updateStatus,placeOrderStripe } from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js';
const orderRouter = express.Router()
import authUser from '../middleware/auth.js';
// admin features
orderRouter.post('/list',adminAuth, allOrders)
orderRouter.post('/status',adminAuth, updateStatus)
// payment gateway
orderRouter.post('/place',authUser, placeOrder)
orderRouter.post('/razorpay', authUser, placeOrderRazorpay)
orderRouter.post('/stripe', authUser, placeOrderStripe)
// user features
orderRouter.post('/user', authUser, userOrders)

export default orderRouter;

