import express from "express";
import { getAll } from "./controller.js";

const router = express.Router();

router.get('/test', getAll)

router.get('/', getAll)

export default router;


