import express from "express";
import {
  addToCart,
  getCartItems,
  removeFromCart,
} from "../controllers/cartController.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.route("/add/:id").get(authenticate, addToCart);
router.route("/getCartItems").get(authenticate, getCartItems);
router.route("/delete/:id").delete(authenticate, removeFromCart);

export default router;
