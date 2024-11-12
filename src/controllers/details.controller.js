import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";
import { BAD_REQUEST, INTERNAL_SERVER, NOT_FOUND, OK } from "../../status.js";
import luu_anh from "../models/luu_anh.js";
import hinh_anh from "../models/hinh_anh.js";
import { Op, where } from 'sequelize';
import nguoi_dung from "../models/nguoi_dung.js";
import bcrypt from 'bcrypt';

const model = initModels(sequelize);


const detailsAuthor = async (req, res) => {
   try {
      let { pictureID } = req.params;
      let data = await model.hinh_anh.findAll({
         where: {
            hinh_id: pictureID,
         },
         attributes: ['ten_hinh', 'duong_dan', 'mo_ta'],
         include: [{
            model: model.nguoi_dung,
            as: 'nguoi_dung',
            attributes: ['ho_ten', 'email', 'nguoi_dung_id'],
            required: true
         }]
      });

      if (data.length === 0) {
         return res.status(NOT_FOUND).json({ message: "There are no information available. Please wait for the update" });
      }

      return res.status(OK).json(data);
   } catch (error) {
      console.log(error);
      return res.status(INTERNAL_SERVER).json({ message: "Something Wrong With API Picture By Author" });
   }
};

const detailsComment = async (req, res) => {
   try {
      let { pictureID } = req.params;
      let data = await model.hinh_anh.findAll({
         where: {
            hinh_id: pictureID,
         },
         attributes: ['ten_hinh', 'duong_dan', 'mo_ta'],
         include: [{
            model: model.binh_luan,
            as: 'binh_luans',
            attributes: ['binh_luan_id', 'nguoi_dung_id', 'noi_dung', 'ngay_binh_luan'],
            required: true
         }]
      });

      if (data.length === 0) {
         return res.status(NOT_FOUND).json({ message: "There are no information available. Please wait for the update" });
      }

      return res.status(OK).json(data);
   } catch (error) {
      console.log(error);
      return res.status(INTERNAL_SERVER).json({ message: "Something Wrong With API Picture By Author" });
   }
};

const savePicture = async (req,res) => {
  try {
   let { pictureID } = req.params;
   let data = await model.luu_anh.findOne({
      where: {
        hinh_id: pictureID,
      },
      include: [{
        model: model.hinh_anh,
        as: 'hinh',
        attributes: ['ten_hinh', 'duong_dan', 'mo_ta']
      }]
    });
    if (!data) {
      return res.status(NOT_FOUND).json({ message: "The picture has not been saved yet." });
    }
    return res.status(OK).json({ 
      message: "The picture has been saved.", 
      data 
   });
  } catch (error) {
   
  }
}


const getUser = async(req,res) =>{
   try {
      let ho_ten = req.query.ho_ten ||'';
      let data = await model.nguoi_dung.findAll({
         where:{
            ho_ten:{
               [Op.like]: `%${ho_ten}%`,
            }
         }
      });
      if(!data){
         return res.status(NOT_FOUND).json({message:"No user information"});
      }
      return res.status(OK).json(data);
   } catch (error) {
      return res.status(INTERNAL_SERVER).json({message:error});
   }
}
const getListPictureCreatedByUserID = async (req,res) =>{
   try {
      let {userID} = req.params;
      let user = await model.nguoi_dung.findOne({
         where: {
            nguoi_dung_id: userID
         }
      });

      if (!user) {
         return res.status(NOT_FOUND).json({
            message: "User not found"
         });
      }
      let data = await model.hinh_anh.findOne({
         where:{
            nguoi_dung_id: userID
         }
      })
      return res.status(OK).json({
         message: "Get list picture created by user id success",
         data:data
      });
   } catch (error) {
      return res.status(INTERNAL_SERVER).json({message:"Get list picture created by user id fail"});
   }
}
const getListPictureSavedByUserID = async (req,res) =>{
   try {
      let {userID} = req.params;
      let user = await model.nguoi_dung.findOne({
         where: {
            nguoi_dung_id: userID
         }
      });

      if (!user) {
         return res.status(NOT_FOUND).json({
            message: "User not found"
         });
      }
      let data = await model.luu_anh.findAll({
         where:{
            nguoi_dung_id: userID
         }
      })
      // check nguoi dung co hay khong
      return res.status(OK).json({
         message: "Get list picture saved by user id success",
         data:data
      });
   } catch (error) {
      return res.status(INTERNAL_SERVER).json({message:"Get list picture saved by user id fail"});
   }
}
const createComment = async (req,res) =>{
   try {
      let { nguoi_dung_id, hinh_id, noi_dung, ngay_binh_luan } = req.body;
      let user = await model.nguoi_dung.findOne({
         where: {
            nguoi_dung_id
         }
      });

      if (!user) {
         return res.status(NOT_FOUND).json({
            message: "User not found"
         });
      }
      const newComment = await model.binh_luan.create({
         nguoi_dung_id,
         hinh_id,
         noi_dung,
         ngay_binh_luan
      });
      return res.status(OK).json({
         message:"comment created successfully",
         data: newComment
      });
   } catch (error) {
      return res.status(INTERNAL_SERVER).json({message:"error"});
   }
}
const createPicture = async(req,res) =>{
   try {
      let{ten_hinh,duong_dan,mo_ta,nguoi_dung_id} = req.body;
      
      const newPicture = await model.hinh_anh.create({
         ten_hinh,
         duong_dan,
         mo_ta,
         nguoi_dung_id
      })
      return res.status(OK).json({
         message:"Picture created successfully",
         data: newPicture
      });
   } catch (error) {
      return res.status(INTERNAL_SERVER).json({message:"error"});
   }
}
const deletePicture = async (req, res) => {
   try {
      const { pictureID } = req.params;

      const picture = await model.hinh_anh.findOne({
         where: {
            hinh_id: pictureID,
         },
      });

      if (!picture) {
         return res.status(NOT_FOUND).json({
            message: "Picture not found"
         });
      }

      const user = await model.nguoi_dung.findOne({
         where: {
            nguoi_dung_id: picture.nguoi_dung_id
         }
      });

      if (!user) {
         return res.status(NOT_FOUND).json({
            message: "User associated with this picture not found"
         });
      }

      await model.hinh_anh.destroy({
         where: {
            hinh_id: pictureID
         },
      });

      return res.status(OK).json({
         message: "Picture deleted successfully"
      });

   } catch (error) {
      console.error("Error deleting picture:", error);
      return res.status(INTERNAL_SERVER).json({
         message: "Error deleting picture"
      });
   }
};

const updateUser = async (req, res) => {
   try {
      const { userID } = req.params;
      const { email, mat_khau, ho_ten, tuoi, anh_dai_dien } = req.body;

      const user = await model.nguoi_dung.findOne({
         where: { nguoi_dung_id: userID },
      });

      if (!user) {
         return res.status(NOT_FOUND).json({ message: "User not found" });
      }

      const updateData = {
         email,
         ho_ten,
         tuoi,
         anh_dai_dien,
      };

      if (mat_khau) {
         updateData.mat_khau = bcrypt.hashSync(mat_khau, 10);
      }

      await model.nguoi_dung.update(updateData, {
         where: { nguoi_dung_id: userID },
      });

      return res.status(OK).json({ message: "Update successfully!" });
   } catch (error) {
      console.error(error);
      return res.status(INTERNAL_SERVER).json({ message: "Error updating user" });
   }
}

export {
   detailsAuthor,
   detailsComment,
   savePicture,
   createPicture,
   getUser,
   getListPictureCreatedByUserID,
   getListPictureSavedByUserID,
   createComment,
   deletePicture,
   updateUser
}
