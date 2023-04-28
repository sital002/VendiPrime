import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import { User } from "../db/models/UserModel.js";
import { deleteImage, uploadImage } from "../utils/cloudinary.js";
import generateToken from "../utils/generateToken.js";

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);
  if (!email || !password) {
    return next(new Error("Email and password is required"));
  }
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new Error("Username and password didn't matched"));
    }
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return next(new Error("Username and password didn't matched"));
    }
    const token = generateToken(user._id);
    return res.status(200).json({
      success: true,
      user,
      token,
    });
  } catch (err) {
    return next(new Error(err));
  }
};

export const registerUser = async (req, res, next) => {
  const { name, email, password, mobile } = req.body;
  if (!name || !email || !password || !req.file || !mobile) {
    return next(new Error("All fields are required"));
  }
  try {
    const user = await User.findOne({ email });
    if (user) {
      return next(new Error("User already exists"));
    }
    const result = await uploadImage(req.file);
    if (!result) return next(new Error("Something went wrong"));

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      mobile: Number(mobile),
      profile: {
        public_id: result.public_id,
        url: result.url,
      },
    });
    const token = generateToken(newUser._id);
    return res.status(201).json({
      success: true,
      user: newUser,
      token,
    });
  } catch (err) {
    next(new Error(err));
  }
};

//Update Profile
export const updateUserProfile = async (req, res, next) => {
  // const data = JSON.parse(req.body.data);
  const data = req.body;
  const { name, mobile } = data;
  if (!name  || !mobile)
    return next(new Error("All fields are required"));
  try {
    const user = await User.findById(req.user.id).populate("orders");
    if(req.file){
       await deleteImage(user.profile.public_id);
      const result = await uploadImage(req.file);
      if (!result) return next(new Error("Something went wrong"));
      user.profile.url = (await result).url;
      user.profile.public_id = (await result).public_id;
    }
    (user.name = name), (user.mobile = mobile);
    await user.save();
    return res.status(200).json({
      user,
    });
  } catch (err) {
    return next(new Error(err));
  }
};

// Change Password
export const changePassword = async (req, res, next) => {
  const { oldPassword, newPassword, cPassword } = req.body;
  if (!oldPassword || !newPassword || !cPassword)
    return next(new Error("All fields are required"));
  if (newPassword !== cPassword)
    return next(new Error("Password and confirm password didn't matched"));
  try {
    const user = await User.findById(req.user._id).select("+password").populate("orders");
    const isMatched = await bcrypt.compare(oldPassword, user.password);
    if (!isMatched) return next(new Error("Old password didn't matched"));
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    return res.status(200).json({
      success: true,
      msg: "Password changed successfully",
      user,
    });
  } catch (err) {
    console.log(err);
    return next(new Error(err));
  }
};
