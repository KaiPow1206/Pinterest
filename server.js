import express from 'express';
import rootRoutes from './src/routes/root.router.js';
const app = express();
//import rootRoutes
app.use(rootRoutes);
//thêm middleware để đọc data json
app.use(express.json());
app.listen(3000,() => {
   console.log("Server online at port 3000");
})