import jwt from "jsonwebtoken";
import { User } from "../db/models/UserModel.js";

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(new Error("Token is required"))
  }
  try{
    const token = authHeader.split(" ")[1];
    try{
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      if (!decoded) {
        return next(new Error("Invalid token"))
        }
          const user = await User.findById(decoded.id).populate("cart").populate("orders");
          req.user = user;
          return next();
        }
        catch(err){
          return next(new Error(err))


        }
    }
    catch(err){
      return next(new Error(err))

};

}



export const isAuthorized = (role)=>{
  return (req,res,next)=>{
        if(!role.includes(req.user.role)){
          return next(new Error("Not Authorized"))
        }
        return next();
    }
}