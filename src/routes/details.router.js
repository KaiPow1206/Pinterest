import express from 'express';
import { detailsAuthor, detailsComment, savePicture } from '../controllers/details.controller.js';

const detailsRoutes = express.Router();

detailsRoutes.get("/details-picture-author/:pictureID",detailsAuthor);
detailsRoutes.get("/details-picture-comment/:pictureID",detailsComment);
detailsRoutes.get("/save-picture/:pictureID",savePicture);
export default detailsRoutes;