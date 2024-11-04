import express from 'express';
import rootRoutes from './src/routes/root.router.js';
const app = express();

//thêm middleware để đọc data json
app.use(express.json());

//import rootRoutes
app.use(rootRoutes);

app.listen(3000,() => {
   console.log("Server online at port 3000");
})