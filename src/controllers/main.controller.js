import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";
import { BAD_REQUEST, CREATED, INTERNAL_SERVER, NOT_FOUND, OK } from "../../status.js";
import { Op } from "sequelize";


const model = initModels(sequelize);
const pictureMain = async (req, res) => {
   try {
      let data = await model.hinh_anh.findAll();
      if (data.length == 0) {
         return res.status(NOT_FOUND).json({ message: "There are no photos available. Please wait for the update" })
      }
      return res.status(OK).json(data);
   } catch (error) {
      return res.status(INTERNAL_SERVER).json({ message: "Something Wrong With API Picture" });
   }
};

const searchPicture = async (req, res) => {
   try {
      let picture_name = req.query.picture_name || "";
      let data = await model.hinh_anh.findAll({
         where: {
            ten_hinh: {
               [Op.like]: `%${picture_name}%`,
            }
         },
      });
      if(data.length == 0){
         return res.status(NOT_FOUND).json({ message: "There are no photos available. Please wait for the update" });
      }
      return res.status(OK).json(data);
   } catch (error) {
      console.log(error)
      return res.status(INTERNAL_SERVER).json({ message: "Something Wrong With API Find Picture" });
   }
}



export {
   pictureMain,
   searchPicture,
}