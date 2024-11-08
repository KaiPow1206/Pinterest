import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";
import { BAD_REQUEST, INTERNAL_SERVER, NOT_FOUND, OK } from "../../status.js";

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



export {
   detailsAuthor,
   detailsComment,
   savePicture
}
