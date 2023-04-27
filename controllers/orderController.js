import { User } from "../db/models/UserModel.js";




export const createOrder = async(req,res,next)=>{
    const {id} = req.params;
    if(!id) return next(new Error("Order Id is required"));
    try{
        const user = await User.findById(req.user._id);
        const index  = user.orders.indexOf(id);
        if(index > -1) return next(new Error("Order already exists"));
        user.orders.push(id);
        await user.save();
        const newUser =  await User.findById(req.user._id).populate("orders")
      res.status(201).json({
        success:true,
        orders:newUser.orders,
        msg:'Order created successfully'
      })
    }
    catch(err){
      return next(new Error(err.message))
    }
  
  }


  
export const getOrders = async(req,res,next)=>{
    try{
      const user = await User.findById(req.user._id).populate("orders")
      res.status(200).json({
        success:true,
        orders:user.orders,
      })
    }
    catch(err){
      return next(new Error(err.message))
    }
  
  }


export const deleteOrder = async(req,res,next)=>{
    const {id} = req.params;
    if(!id) return next(new Error("Order Id is required"));
    try{
      const user = await User.findById(req.user._id);
      const index  = user.orders.indexOf(id);
      if(index <= -1) return next(new Error("Not found"));
      user.orders.splice(index,1);
      await user.save();

      const newUser = await User.findById(req.user._id).populate("orders");
      res.status(200).json({
        success:true,
        orders:newUser.orders,
        msg:'Order deleted successfully'
      })
    }
    catch(err){
      return next(new Error(err.message))
    }
  
  }