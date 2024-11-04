import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";
import bcrypt from 'bcrypt';
import { BAD_REQUEST, CREATED, INTERNAL_SERVER } from "../../status.js";
import { createToken } from "../config/jwt.js";



const model = initModels(sequelize);

const registerUser = async (req,res) => {
  try {
   const {ho_ten, mat_khau,email}=req.body;
   const checkUserExits = await model.nguoi_dung.findOne({
      where:{
         email:email,
      }
   })
   if(checkUserExits){
      return res.status(BAD_REQUEST).json({message:"Already Account"});
   }
   const newUser = await model.nguoi_dung.create({
      ho_ten:ho_ten,
      email:email,
      mat_khau:bcrypt.hashSync(mat_khau,10),
   })
   return res.status(CREATED).json({
      message:"Successful Created User",
      data:newUser
   });
  } catch (error) {
   return res.status(INTERNAL_SERVER).json({message:"Something Worng With API Register"});
  }
}

const loginUser = async (req,res) => {
  try {
   const{email,mat_khau}=req.body;
   const user= await model.nguoi_dung.findOne({
      where:{
         email,
      }
   })
   if(!user){
      return res.status(BAD_REQUEST).json({message:"Email is Worng"});
   }
   let checkPass = bcrypt.compareSync(mat_khau,user.mat_khau);
   if (!checkPass){
      return res.status(400).json({message:"Passwword is wrong"});
   }
   let payload={
      userId:user.nguoi_dung_id
   }
   let accessToken = createToken({userId:user.nguoi_dung_id});
   return res.status(200).json({
      message:"Login Successfully",
      data: accessToken,
   });
  } catch (error) {
   console.log(error);
   return res.status(INTERNAL_SERVER).json({
      message: "Something Wrong With API Login"
   });
  }
}



export {
   registerUser,
   loginUser
}