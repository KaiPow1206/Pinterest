import express from 'express';
import { pictureMain, searchPicture } from '../controllers/main.controller.js';

const mainRoutes = express.Router();
mainRoutes.get('/Picture',pictureMain);
mainRoutes.get("/Search-Picture",searchPicture);

export default mainRoutes;