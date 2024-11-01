import express from 'express';
import testRoutes from './test.router.js';


const rootRoutes = express.Router();
rootRoutes.use("/test",testRoutes);


export default rootRoutes;