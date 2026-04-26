import express from 'express';
import { addToCart, getCart, updateCart } from '../controllers/cartControllers.js';
import  authUser  from '../middleware/auth.js';
const router = express.Router();

router.post('/add', authUser ,addToCart);
router.post('/get', authUser, getCart);
router.post('/update',authUser  ,updateCart);

export default router;