import { User } from "../db/models/UserModel.js";

export const addToCart = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next(new Error("Product Id   is required"));
  }

  try {
    const user = await User.findById(req.user._id);
    const { cart } = user;
    if (
      cart.find((item) => {
        return item == id;
      })
    )
      return next(new Error("Item is already in cart"));
    cart.push(id);
    await user.save();
    const temp = await User.findById(req.user._id).populate("cart");
    res.status(200).json({
      msg: "Added to cart",
      cart:temp.cart,
    });
  } catch (err) {
    return next(new Error(err.message));
  }
};

export const removeFromCart = async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(new Error("Id is required"));
  try {
    const user = await User.findById(req.user._id);
    const { cart } = user;
    const index = cart.indexOf(id);
    if (index === -1) return next(new Error("Not Found"));
    cart.splice(index, 1);
    await user.save();
    const temp = await User.findById(req.user._id).populate("cart");

    res.status(200).json({
      cart:temp.cart,
    });
  } catch (err) {
    return next(new Error(err.message));
  }
};

export const getCartItems = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate("cart");
    res.status(200).json({
      cart: user.cart,
    });
  } catch (err) {
    return next(new Error(err.message));
  }
};
