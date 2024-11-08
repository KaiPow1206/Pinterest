import express from 'express';
import { detailsAuthor, detailsComment, savePicture } from '../controllers/details.controller.js';
import { middlewareToken } from '../config/jwt.js';

const detailsRoutes = express.Router();

detailsRoutes.get("/details-picture-author/:pictureID",detailsAuthor);
detailsRoutes.get("/details-picture-comment/:pictureID",detailsComment);
detailsRoutes.get("/save-picture/:pictureID",middlewareToken,savePicture);
export default detailsRoutes;