import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { UNAUTHORIZE } from '../../status.js';


dotenv.config();

export const createToken = (data) => {
   return jwt.sign({payload:data},process.env.ACCESS_TOKEN_KEY,{
    algorithm: "HS256",
    expiresIn: "10m"
   })
}

export const verifyToken = (token) =>{
   try {
    jwt.verify(token,process.env.ACCESS_TOKEN_KEY);
    return true;
   } catch (error) {
    //không verify được token
    return false;
   }
}


export const middlewareToken = (req,res,next) =>{
   let {token} = req.headers;   
   let checkToken= verifyToken(token);

   if(checkToken){
   // nếu token hợp lệ =>pass=> qua router
      next();
   }
   else{
      return res.status(UNAUTHORIZE).json({message:"Unauthorized"})
   }
}


