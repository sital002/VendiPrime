

import jwt from 'jsonwebtoken';



const generateToken = (id)=>{
    const token = jwt.sign({id,},process.env.JWT_SECRET_KEY,{expiresIn:process.env.JWT_EXPIRE});
    return token
}

export default generateToken