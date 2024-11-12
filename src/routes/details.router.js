import express from 'express';
import {  detailsAuthor, detailsComment, savePicture,createPicture, getUser,getListPictureCreatedByUserID, createComment, getListPictureSavedByUserID, deletePicture, updateUser } from '../controllers/details.controller.js';
import { middlewareToken } from '../config/jwt.js';
import { upload } from '../config/upload.js';

const detailsRoutes = express.Router();

detailsRoutes.get("/details-picture-author/:pictureID",detailsAuthor);
detailsRoutes.get("/details-picture-comment/:pictureID",detailsComment);
detailsRoutes.get("/save-picture/:pictureID",middlewareToken,savePicture);
detailsRoutes.post("/create-picture",middlewareToken,createPicture);
detailsRoutes.get("/get-info-user",middlewareToken,getUser);
detailsRoutes.get("/get-list-picture-created-by-userid/:userID",middlewareToken,getListPictureCreatedByUserID);
detailsRoutes.get("/get-list-picture-saved-by-userid/:userID",middlewareToken,getListPictureSavedByUserID);
detailsRoutes.delete("/delete-picture-by-pictureid/:pictureID",middlewareToken,deletePicture);
detailsRoutes.put("/update-user/:userID",middlewareToken,updateUser)
detailsRoutes.post("/create-comment",middlewareToken,createComment)
export default detailsRoutes;