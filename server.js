import express from "express";
import cors from 'cors'
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import router from './users/route.js'
import { getAll } from './users/controller.js'
dotenv.config();

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// app.listen(process.env.PGPORT || 3001, () => {
//   console.log(`Server listening on ${process.env.PGPORT || 3001}`);
// });
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});


app.use('/users', router)

app.get('/', getAll)