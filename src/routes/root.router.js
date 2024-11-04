import express from 'express';
import authRoutes from './auth.router.js';


const rootRoutes = express.Router();
rootRoutes.use("/auth",authRoutes);


export default rootRoutes;