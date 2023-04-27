import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const UserSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"]
    },
    email:{
        type:String,
        required:[true,"Email is required"]
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        select:false
    },
    role:{
        type:String,
        default:"user"
    },
    profile:{
        public_id:String,
        url:String
    },
    mobile:{
        type:Number,
        required:[true,"Mobile is required"]
    },
    cart:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"product"
        }
    ],
    orders:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"product"
        }
    ],
    createdAt:{
        type:Date,
        default: Date.now
    }
});


UserSchema.methods.addToCart = function({product,quantity}){
   return this.cart.push({product,quantity})
}


UserSchema.methods.removeFromCart = function({productId}){
    this.cart = this.cart.filter((item)=> {
        return  item._id  !== productId
    }
        )
}

UserSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}


UserSchema.methods.getCartItems = function(){
    return this.cart;
}
export const User = mongoose.model("user",UserSchema);