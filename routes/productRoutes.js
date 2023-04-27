import express from 'express'
import {  createProduct, deleteProduct, filterProduct, getProductDetails, getProducts } from '../controllers/productController.js';
import { authenticate, isAuthorized } from '../middleware/auth.js';
import multer from 'multer';



const router = express.Router();

const upload = multer({ dest: 'uploads/' })

router.route("/getproducts").get(getProducts);
router.route("/search").get(filterProduct);
router.route("/:id").get(getProductDetails);
router.route("/new").post(authenticate,upload.single("productImage"),createProduct)
router.route("/delete/:id").delete(authenticate,deleteProduct)

export default router;