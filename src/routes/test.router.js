import express from 'express';
import {helloWorld} from '../controllers/test.controller.js'

const testRoutes = express.Router();
testRoutes.get('/hello',helloWorld)
export default testRoutes;
