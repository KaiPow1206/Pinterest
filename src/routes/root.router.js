import express from 'express';
import authRoutes from './auth.router.js';
import mainRoutes from './main.router.js';
import detailsRoutes from './details.router.js';


const rootRoutes = express.Router();
rootRoutes.use("/auth",authRoutes);
rootRoutes.use("/main",mainRoutes);
rootRoutes.use("/details",detailsRoutes);


export default rootRoutes;