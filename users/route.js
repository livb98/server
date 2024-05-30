import express from "express";
import { getAll, Register, Login } from "./controller.js";
import { verifiedToken } from "../middlewares/verifiedToken.js";

const router = express.Router();

router.get('/users', getAll)
router.post('/register', Register)
router.post('/login', Login)

export default router;


