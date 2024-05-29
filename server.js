import express from "express";
import cors from 'cors'
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import usersRouter from './users/route.js'
dotenv.config();

const app = express();
app.use(cors());


app.listen(process.env.PORT || 3001, () => {
  console.log(`Server listening on ${process.env.PORT || 3001}`);
});

app.use('/users', usersRouter)