import express from "express";
import multer from "multer";
import { changePassword, loginUser, registerUser, updateUserProfile } from "../controllers/userControllers.js";
import { authenticate } from "../middleware/auth.js";
import generateToken from "../utils/generateToken.js";

const router = express.Router();

const upload = multer({ dest: 'uploads/' })

router.route("/register").post(upload.single("profile"),registerUser);
router.route("/login").post(loginUser);
router.route("/profile/update").put(authenticate,upload.single("profile"),updateUserProfile);
router.route("/changepassword").put(authenticate,changePassword)
router.route("/authenticate").get(authenticate, (req, res) => {
  const {name,email,profile,mobile,orders} = req.user;
  res.status(200).json({
    success: true,
    user: {
      name,email,profile,mobile,orders
    },
  });
});

export default router;
