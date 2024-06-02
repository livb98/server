import express from "express";
import cors from 'cors'
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import router from './route.js'
import { verifiedToken } from "./middlewares/verifiedToken.js";
dotenv.config();

const app = express();
app.use(cors({origin: 'http://localhost:3000', credentials: true}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.listen(process.env.PORT || 3001, () => {
  console.log(`Server listening on ${process.env.PORT || 3001}`);
});

app.use('/', router)
