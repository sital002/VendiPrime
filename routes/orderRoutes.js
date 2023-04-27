import express from 'express'
import { createOrder, deleteOrder, getOrders } from '../controllers/orderController.js';
import { authenticate } from '../middleware/auth.js';




const router = express.Router();

router.route("/new/:id").post(authenticate,createOrder);
router.route("/delete/:id").delete(authenticate,deleteOrder);
router.route("/getOrders").get(authenticate,getOrders);

export default router