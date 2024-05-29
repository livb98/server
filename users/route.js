import express from "express";
import { getAll } from "./controller.js";

const router = express.Router();

router.get('/get', getAll)

export default router;